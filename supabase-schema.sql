-- ============================================================
-- fanSALE — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  iban TEXT, -- encrypted in production
  rating NUMERIC(3,2) DEFAULT 5.0,
  verified BOOLEAN DEFAULT FALSE,
  successful_sales INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'IT',
  event_date TIMESTAMPTZ NOT NULL,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (TRUE);
CREATE POLICY "Only admins can insert events" ON events FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND verified = TRUE)
);

-- ============================================================
-- TICKETS (listings)
-- ============================================================
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,

  -- Event info (denormalized for when event_id is null)
  event_artist TEXT NOT NULL,
  event_title TEXT NOT NULL,
  event_venue TEXT NOT NULL,
  event_city TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,

  -- Seat info
  section TEXT,
  row TEXT,
  seat TEXT,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 1 AND quantity <= 10),

  -- Nominative flag
  is_nominative BOOLEAN DEFAULT FALSE,

  -- Pricing
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  original_price NUMERIC(10,2),

  -- Proof
  proof_url TEXT,
  ocr_verified BOOLEAN DEFAULT FALSE,
  ocr_confidence NUMERIC(3,2),

  -- Status
  status TEXT NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'locked', 'sold', 'flagged', 'expired', 'cancelled')),
  locked_until TIMESTAMPTZ,
  locked_by_email TEXT,

  -- Description
  description TEXT,

  -- Fraud score (0-100)
  fraud_score INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Available tickets are viewable by everyone"
  ON tickets FOR SELECT USING (status IN ('available', 'locked'));

CREATE POLICY "Sellers can view own tickets"
  ON tickets FOR SELECT USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can insert tickets"
  ON tickets FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own tickets"
  ON tickets FOR UPDATE USING (auth.uid() = seller_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES tickets(id),
  buyer_id UUID REFERENCES profiles(id),
  buyer_email TEXT NOT NULL,

  -- Buyer details for ticket reissuance
  buyer_full_name TEXT NOT NULL,
  buyer_birth_date DATE,
  buyer_phone TEXT,
  buyer_address TEXT,
  buyer_city TEXT,
  buyer_postal_code TEXT,

  -- Attendee names (for nominative tickets)
  attendees JSONB,

  -- Delivery
  delivery_method TEXT DEFAULT 'email' CHECK (delivery_method IN ('email', 'app')),

  -- Pricing
  subtotal NUMERIC(10,2) NOT NULL,
  service_fee NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,

  -- Payment
  payment_intent_id TEXT UNIQUE,
  payment_method TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'ticket_sent', 'completed', 'refunded', 'disputed', 'failed')),

  -- New ticket issued to buyer
  new_ticket_url TEXT,
  new_ticket_sent_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers can view own orders"
  ON orders FOR SELECT USING (auth.uid() = buyer_id OR buyer_email = auth.email());

CREATE POLICY "Sellers can view orders for their tickets"
  ON orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM tickets WHERE tickets.id = orders.ticket_id AND tickets.seller_id = auth.uid())
  );

CREATE POLICY "Anyone can create an order"
  ON orders FOR INSERT WITH CHECK (TRUE);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- PAYOUTS
-- ============================================================
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES profiles(id),
  order_id UUID NOT NULL REFERENCES orders(id),
  amount NUMERIC(10,2) NOT NULL,
  iban TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'paid', 'failed')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sellers can view own payouts"
  ON payouts FOR SELECT USING (auth.uid() = seller_id);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  seller_id UUID NOT NULL REFERENCES profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are public" ON reviews FOR SELECT USING (TRUE);
CREATE POLICY "Buyers can insert reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- ============================================================
-- FRAUD FLAGS
-- ============================================================
CREATE TABLE IF NOT EXISTS fraud_flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id),
  order_id UUID REFERENCES orders(id),
  flagged_by UUID REFERENCES profiles(id),
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fraud_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view fraud flags" ON fraud_flags FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND verified = TRUE)
);

-- ============================================================
-- REALTIME — enable for live ticket status updates
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_event_date ON tickets(event_date);
CREATE INDEX IF NOT EXISTS idx_tickets_seller_id ON tickets(seller_id);
CREATE INDEX IF NOT EXISTS idx_tickets_event_city ON tickets(event_city);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_email ON orders(buyer_email);
CREATE INDEX IF NOT EXISTS idx_orders_ticket_id ON orders(ticket_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent ON orders(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
