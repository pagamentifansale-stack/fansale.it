// Shared mock ticket data used by /event/[slug]/tickets, /ticket/[ticketId], and /checkout/[ticketId]
// Each event slug maps to event info + a record of tickets keyed by ticket id

export interface MockTicket {
  id: string;
  quantity: number;
  section: string;
  row?: string;
  seat?: string;
  seatNumber?: number;
  isNumbered: boolean;
  is_nominative: boolean;
  price: number;
  description: string;
  seller: {
    username: string;
    rating: number;
    verified: boolean;
    successful_sales: number;
  };
  locked_until: string | null;
}

export interface MockEvent {
  eventTitle: string;
  artist: string;
  venue: string;
  city: string;
  date: string;   // display e.g. "07/06/2026"
  time: string;   // display e.g. "21:00"
  tickets: Record<string, MockTicket>;
}

export const MOCK_EVENT_TICKETS: Record<string, MockEvent> = {
  "geolier-napoli-2026-06-26": {
    eventTitle: "Geolier - Stadi 2026", artist: "Geolier", venue: "Stadio Diego Armando Maradona", city: "Napoli", date: "26/06/2026", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 3, section: "Prato Gold", isNumbered: false, is_nominative: true, price: 95.0, seller: { username: "geolier_gold", rating: 4.9, verified: true, successful_sales: 11 }, locked_until: null, description: "Package Prato Gold — 3 biglietti consecutivi. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, trasferimento tramite fanSALE." },
      "geolier-prato-gold-jun26": { id: "geolier-prato-gold-jun26", quantity: 2, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "marco_napoli", rating: 4.8, verified: true, successful_sales: 23 }, locked_until: null, description: "2 biglietti Prato Gold Package — venerdì 26 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-jun26": { id: "geolier-prato-jun26", quantity: 4, section: "Prato", isNumbered: false, is_nominative: true, price: 59.0, seller: { username: "sofia_fan", rating: 4.9, verified: true, successful_sales: 41 }, locked_until: null, description: "4 biglietti Prato — venerdì 26 giugno 2026. Posti non numerati, ottima posizione centrale. Biglietti nominativi, cambio nominativo disponibile." },
    },
  },
  "geolier-napoli-2026-06-27": {
    eventTitle: "Geolier - Stadi 2026", artist: "Geolier", venue: "Stadio Diego Armando Maradona", city: "Napoli", date: "27/06/2026", time: "21:00",
    tickets: {
      "geolier-prato-gold-jun27": { id: "geolier-prato-gold-jun27", quantity: 3, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "luigi_tickets", rating: 4.7, verified: true, successful_sales: 15 }, locked_until: null, description: "3 biglietti Prato Gold Package — sabato 27 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-jun27": { id: "geolier-prato-jun27", quantity: 2, section: "Prato", isNumbered: false, is_nominative: true, price: 59.0, seller: { username: "anna_concert", rating: 4.5, verified: false, successful_sales: 8 }, locked_until: null, description: "2 biglietti Prato — sabato 27 giugno 2026. Posti non numerati, ottima posizione centrale. Biglietti nominativi, cambio nominativo disponibile." },
    },
  },
  "geolier-napoli-2026-06-28": {
    eventTitle: "Geolier - Stadi 2026", artist: "Geolier", venue: "Stadio Diego Armando Maradona", city: "Napoli", date: "28/06/2026", time: "21:00",
    tickets: {
      "geolier-prato-jun28": { id: "geolier-prato-jun28", quantity: 3, section: "Prato", isNumbered: false, is_nominative: true, price: 59.0, seller: { username: "roberto_vip", rating: 5.0, verified: true, successful_sales: 67 }, locked_until: null, description: "3 biglietti Prato — domenica 28 giugno 2026. Posti non numerati, ottima posizione centrale. Biglietti nominativi, cambio nominativo disponibile." },
    },
  },
  "geolier-napoli-2026-06-07": {
    eventTitle: "Geolier - 2026 Stage", artist: "Geolier", venue: "Stadio Maradona", city: "Napoli", date: "07/06/2026", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Curva A", isNumbered: false, is_nominative: true, price: 65.0, seller: { username: "napoli_fan99", rating: 4.9, verified: true, successful_sales: 8 }, locked_until: null, description: "Biglietto in Curva A, ottima visuale. Nominativo, trasferimento tramite fanSALE." },
      t2: { id: "t2", quantity: 2, section: "Tribuna Posillipo", row: "Fila 9", seatNumber: 5, isNumbered: true, is_nominative: true, price: 68.0, seller: { username: "geolierfan", rating: 4.7, verified: true, successful_sales: 3 }, locked_until: null, description: "Due biglietti consecutivi in Tribuna Posillipo, Fila 9." },
      t3: { id: "t3", quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 62.0, seller: { username: "concertlover", rating: 4.5, verified: false, successful_sales: 1 }, locked_until: null, description: "Biglietto prato, posto non numerato. Ottima posizione centrale." },
      t4: { id: "t4", quantity: 4, section: "Curva B", isNumbered: false, is_nominative: true, price: 65.0, seller: { username: "marco_fan", rating: 4.8, verified: true, successful_sales: 12 }, locked_until: null, description: "Quattro biglietti in Curva B, posti vicini." },
    },
  },
  "geolier-milano-2026-06-14": {
    eventTitle: "Geolier - 2026 Stage", artist: "Geolier", venue: "Stadio San Siro", city: "Milano", date: "14/06/2026", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Secondo Anello Verde", isNumbered: false, is_nominative: true, price: 68.0, seller: { username: "siro_fan", rating: 4.8, verified: true, successful_sales: 5 }, locked_until: null, description: "Biglietto Secondo Anello Verde, visuale perfetta." },
      t2: { id: "t2", quantity: 2, section: "Prato", isNumbered: false, is_nominative: true, price: 65.0, seller: { username: "milanofan", rating: 4.6, verified: true, successful_sales: 7 }, locked_until: null, description: "Due biglietti prato, posizione centrale." },
      t3: { id: "t3", quantity: 1, section: "Primo Anello Arancio", row: "Fila 5", seat: "Posto 28", seatNumber: 28, isNumbered: true, is_nominative: true, price: 72.0, seller: { username: "geolier_mi", rating: 4.9, verified: true, successful_sales: 15 }, locked_until: null, description: "Posto numerato Primo Anello Arancio, Fila 5 Posto 28. Vista eccellente." },
      t4: { id: "t4", quantity: 3, section: "Secondo Anello Rosso", isNumbered: false, is_nominative: true, price: 68.0, seller: { username: "trio_fan", rating: 4.7, verified: true, successful_sales: 4 }, locked_until: null, description: "Tre biglietti consecutivi Secondo Anello Rosso." },
    },
  },
  "bad-bunny-milano-2025-07-10": {
    eventTitle: "Bad Bunny - DeBÍ TiRAR MáS FOToS Tour", artist: "Bad Bunny", venue: "Stadio San Siro", city: "Milano", date: "10/07/2025", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "bunny_fan1", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto prato Bad Bunny Milano." },
      t2: { id: "t2", quantity: 2, section: "Secondo Anello Verde", row: "Fila 10", seatNumber: 12, isNumbered: true, is_nominative: true, price: 90.0, seller: { username: "siro_bb", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Due biglietti Secondo Anello Verde, Fila 10." },
      t3: { id: "t3", quantity: 1, section: "Primo Anello Arancio", row: "Fila 4", seat: "Posto 18", seatNumber: 18, isNumbered: true, is_nominative: true, price: 95.0, seller: { username: "vip_seat", rating: 4.9, verified: true, successful_sales: 20 }, locked_until: null, description: "Posto numerato premium Primo Anello Arancio." },
      t4: { id: "t4", quantity: 4, section: "Prato", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "group_fan", rating: 4.6, verified: true, successful_sales: 3 }, locked_until: null, description: "Quattro biglietti prato consecutivi." },
    },
  },
  "bad-bunny-roma-2025-07-13": {
    eventTitle: "Bad Bunny - DeBÍ TiRAR MáS FOToS Tour", artist: "Bad Bunny", venue: "Stadio Olimpico", city: "Roma", date: "13/07/2025", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Curva Nord", isNumbered: false, is_nominative: true, price: 88.0, seller: { username: "roma_bb", rating: 4.8, verified: true, successful_sales: 4 }, locked_until: null, description: "Biglietto Curva Nord Stadio Olimpico." },
      t2: { id: "t2", quantity: 2, section: "Tribuna Monte Mario", row: "Fila 8", seatNumber: 20, isNumbered: true, is_nominative: true, price: 92.0, seller: { username: "olimpico_fan", rating: 4.7, verified: true, successful_sales: 11 }, locked_until: null, description: "Due biglietti Tribuna Monte Mario, Fila 8." },
      t3: { id: "t3", quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 88.0, seller: { username: "prato_roma", rating: 4.5, verified: false, successful_sales: 2 }, locked_until: null, description: "Biglietto prato Roma." },
      t4: { id: "t4", quantity: 3, section: "Curva Sud", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "curva_fan", rating: 4.6, verified: true, successful_sales: 7 }, locked_until: null, description: "Tre biglietti Curva Sud." },
    },
  },
  "ultimo-milano-2026-07-11": {
    eventTitle: "Ultimo - La Favola per Sempre", artist: "Ultimo", venue: "Stadio San Siro", city: "Milano", date: "11/07/2026", time: "20:30",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Secondo Anello Verde", isNumbered: false, is_nominative: true, price: 95.0, seller: { username: "ultimo_mi", rating: 4.9, verified: true, successful_sales: 10 }, locked_until: null, description: "Biglietto Secondo Anello Verde." },
      t2: { id: "t2", quantity: 2, section: "Prato", isNumbered: false, is_nominative: true, price: 90.0, seller: { username: "prato_mi", rating: 4.7, verified: true, successful_sales: 5 }, locked_until: null, description: "Due biglietti prato." },
      t3: { id: "t3", quantity: 1, section: "Primo Anello Arancio", row: "Fila 7", seat: "Posto 15", seatNumber: 15, isNumbered: true, is_nominative: true, price: 98.0, seller: { username: "vip_ultimo", rating: 4.8, verified: true, successful_sales: 8 }, locked_until: null, description: "Posto numerato premium Primo Anello Arancio, Fila 7 Posto 15." },
    },
  },
  "ultimo-roma-2026-07-04": {
    eventTitle: "Ultimo - La Favola per Sempre", artist: "Ultimo", venue: "Tor Vergata", city: "Roma", date: "04/07/2026", time: "20:30",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 77.28, seller: { username: "ultimo_ro", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto posto unico." },
      t2: { id: "t2", quantity: 2, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 90.16, seller: { username: "coppia_ro", rating: 4.6, verified: true, successful_sales: 3 }, locked_until: null, description: "Due biglietti posto unico." },
      t3: { id: "t3", quantity: 1, section: "Settore A", row: "Fila 5", seat: "Posto 12", seatNumber: 12, isNumbered: true, is_nominative: true, price: 82.0, seller: { username: "settore_a", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Posto numerato Settore A, Fila 5 Posto 12." },
      t4: { id: "t4", quantity: 3, section: "Settore B", isNumbered: false, is_nominative: true, price: 77.28, seller: { username: "trio_ro", rating: 4.5, verified: false, successful_sales: 1 }, locked_until: null, description: "Tre biglietti Settore B." },
    },
  },
  "annalisa-bologna-2025-11-14": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour", artist: "Annalisa", venue: "Unipol Arena", city: "Bologna", date: "14/11/2025", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 45.0, seller: { username: "anna_bo", rating: 4.8, verified: true, successful_sales: 5 }, locked_until: null, description: "Biglietto posto unico Unipol Arena." },
      t2: { id: "t2", quantity: 2, section: "Settore A", row: "Fila 4", seatNumber: 8, isNumbered: true, is_nominative: true, price: 48.0, seller: { username: "vortice_bo", rating: 4.7, verified: true, successful_sales: 7 }, locked_until: null, description: "Due biglietti Settore A, Fila 4." },
      t3: { id: "t3", quantity: 1, section: "Tribuna Numerata", row: "Fila 2", seat: "Posto 8", seatNumber: 8, isNumbered: true, is_nominative: true, price: 50.0, seller: { username: "tribuna_bo", rating: 4.9, verified: true, successful_sales: 14 }, locked_until: null, description: "Posto numerato Tribuna, Fila 2 Posto 8." },
    },
  },
  "annalisa-milano-2025-11-22": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour", artist: "Annalisa", venue: "Mediolanum Forum", city: "Milano", date: "22/11/2025", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Parterre in Piedi", isNumbered: false, is_nominative: true, price: 48.5, seller: { username: "anna_mi", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto parterre in piedi." },
      t2: { id: "t2", quantity: 2, section: "Settore B", row: "Fila 6", seatNumber: 10, isNumbered: true, is_nominative: true, price: 50.0, seller: { username: "forum_fan", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Due biglietti Settore B, Fila 6." },
      t3: { id: "t3", quantity: 1, section: "Tribuna Centrale", row: "Fila 1", seat: "Posto 12", seatNumber: 12, isNumbered: true, is_nominative: true, price: 55.0, seller: { username: "tribuna_mi", rating: 4.9, verified: true, successful_sales: 18 }, locked_until: null, description: "Posto premium Tribuna Centrale, Fila 1 Posto 12." },
      t4: { id: "t4", quantity: 3, section: "Parterre in Piedi", isNumbered: false, is_nominative: true, price: 48.5, seller: { username: "trio_mi", rating: 4.6, verified: true, successful_sales: 4 }, locked_until: null, description: "Tre biglietti parterre in piedi." },
    },
  },
  "annalisa-roma-2025-11-29": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour", artist: "Annalisa", venue: "Palazzo dello Sport", city: "Roma", date: "29/11/2025", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 46.0, seller: { username: "anna_ro", rating: 4.8, verified: true, successful_sales: 5 }, locked_until: null, description: "Biglietto posto unico." },
      t2: { id: "t2", quantity: 2, section: "Settore C", row: "Fila 5", seatNumber: 14, isNumbered: true, is_nominative: true, price: 48.0, seller: { username: "sport_ro", rating: 4.7, verified: true, successful_sales: 6 }, locked_until: null, description: "Due biglietti Settore C, Fila 5." },
      t3: { id: "t3", quantity: 1, section: "Tribuna Numerata", row: "Fila 3", seat: "Posto 19", seatNumber: 19, isNumbered: true, is_nominative: true, price: 52.0, seller: { username: "tribuna_ro", rating: 4.9, verified: true, successful_sales: 11 }, locked_until: null, description: "Posto numerato Tribuna, Fila 3 Posto 19." },
    },
  },
  "vasco-rossi-roma-2026-06-06": {
    eventTitle: "Vasco Live 2026", artist: "Vasco Rossi", venue: "Stadio Olimpico", city: "Roma", date: "06/06/2026", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Curva Nord", isNumbered: false, is_nominative: true, price: 89.5, seller: { username: "vasco_ro", rating: 4.8, verified: true, successful_sales: 7 }, locked_until: null, description: "Biglietto Curva Nord Stadio Olimpico." },
      t2: { id: "t2", quantity: 2, section: "Tribuna", row: "Fila 10", seatNumber: 5, isNumbered: true, is_nominative: true, price: 94.0, seller: { username: "olimpico_v", rating: 4.7, verified: true, successful_sales: 10 }, locked_until: null, description: "Due biglietti Tribuna, Fila 10." },
      t3: { id: "t3", quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 79.0, seller: { username: "prato_v", rating: 4.5, verified: false, successful_sales: 2 }, locked_until: null, description: "Biglietto prato." },
    },
  },
  "vasco-rossi-milano-2026-06-13": {
    eventTitle: "Vasco Live 2026", artist: "Vasco Rossi", venue: "Stadio San Siro", city: "Milano", date: "13/06/2026", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Secondo Anello Verde", isNumbered: false, is_nominative: true, price: 94.0, seller: { username: "vasco_mi", rating: 4.8, verified: true, successful_sales: 9 }, locked_until: null, description: "Biglietto Secondo Anello Verde." },
      t2: { id: "t2", quantity: 2, section: "Primo Anello Arancio", row: "Fila 12", seatNumber: 8, isNumbered: true, is_nominative: true, price: 98.0, seller: { username: "siro_v", rating: 4.7, verified: true, successful_sales: 13 }, locked_until: null, description: "Due biglietti Primo Anello Arancio, Fila 12." },
      t3: { id: "t3", quantity: 3, section: "Prato", isNumbered: false, is_nominative: true, price: 90.0, seller: { username: "prato_mi_v", rating: 4.6, verified: true, successful_sales: 5 }, locked_until: null, description: "Tre biglietti prato." },
      t4: { id: "t4", quantity: 1, section: "Tribuna Numerata", row: "Fila 3", seat: "Posto 22", seatNumber: 22, isNumbered: true, is_nominative: true, price: 105.0, seller: { username: "tribuna_v", rating: 4.9, verified: true, successful_sales: 16 }, locked_until: null, description: "Posto premium Tribuna Numerata, Fila 3 Posto 22." },
    },
  },
  "vasco-rossi-napoli-2026-06-20": {
    eventTitle: "Vasco Live 2026", artist: "Vasco Rossi", venue: "Stadio Maradona", city: "Napoli", date: "20/06/2026", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Curva Sud", isNumbered: false, is_nominative: true, price: 79.0, seller: { username: "vasco_na", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto Curva Sud Stadio Maradona." },
      t2: { id: "t2", quantity: 2, section: "Tribuna Laterale", row: "Fila 8", seatNumber: 15, isNumbered: true, is_nominative: true, price: 82.0, seller: { username: "maradona_v", rating: 4.7, verified: true, successful_sales: 8 }, locked_until: null, description: "Due biglietti Tribuna Laterale, Fila 8." },
      t3: { id: "t3", quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 75.0, seller: { username: "prato_na", rating: 4.5, verified: false, successful_sales: 1 }, locked_until: null, description: "Biglietto prato." },
    },
  },
  "vasco-rossi-bologna-2026-06-27": {
    eventTitle: "Vasco Live 2026", artist: "Vasco Rossi", venue: "Stadio Dall'Ara", city: "Bologna", date: "27/06/2026", time: "21:00",
    tickets: {
      t1: { id: "t1", quantity: 1, section: "Curva Andrea Costa", isNumbered: false, is_nominative: true, price: 82.0, seller: { username: "vasco_bo", rating: 4.8, verified: true, successful_sales: 7 }, locked_until: null, description: "Biglietto Curva Andrea Costa." },
      t2: { id: "t2", quantity: 2, section: "Tribuna Centrale", row: "Fila 6", seatNumber: 10, isNumbered: true, is_nominative: true, price: 85.0, seller: { username: "dallara_v", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Due biglietti Tribuna Centrale, Fila 6." },
      t3: { id: "t3", quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 78.0, seller: { username: "prato_bo", rating: 4.5, verified: false, successful_sales: 2 }, locked_until: null, description: "Biglietto prato." },
    },
  },
};

// Aggregated slug for all 3 Geolier Napoli 2026 dates — merges tickets from all date-specific entries
const GEOLIER_NAPOLI_2026_TICKETS: Record<string, MockTicket> = {
  ...MOCK_EVENT_TICKETS["geolier-napoli-2026-06-26"].tickets,
  ...MOCK_EVENT_TICKETS["geolier-napoli-2026-06-27"].tickets,
  ...MOCK_EVENT_TICKETS["geolier-napoli-2026-06-28"].tickets,
};

MOCK_EVENT_TICKETS["geolier-napoli-2026"] = {
  eventTitle: "Geolier - Stadi 2026",
  artist: "Geolier",
  venue: "Stadio Diego Armando Maradona",
  city: "Napoli",
  date: "26–28/06/2026",
  time: "21:00",
  tickets: GEOLIER_NAPOLI_2026_TICKETS,
};

export function getMockTicketData(eventSlug: string, ticketId: string) {
  const event = MOCK_EVENT_TICKETS[eventSlug];
  if (!event) return null;
  const ticket = event.tickets[ticketId];
  if (!ticket) return null;
  return { event, ticket };
}
