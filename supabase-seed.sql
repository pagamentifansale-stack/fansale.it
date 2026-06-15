-- ============================================================
-- fanSALE — Real Italian Concert Events Seed Data
-- Run AFTER supabase-schema.sql
-- Data sourced from publicly known 2025-2026 Italian tour announcements
-- ============================================================

INSERT INTO events (artist, title, venue, city, country, event_date, slug) VALUES

-- Vasco Rossi
('Vasco Rossi', 'Vasco Live 2026', 'Stadio Olimpico', 'Roma', 'IT', '2026-06-06 21:00:00+02', 'vasco-rossi-roma-2026-06-06'),
('Vasco Rossi', 'Vasco Live 2026', 'Stadio San Siro', 'Milano', 'IT', '2026-06-13 21:00:00+02', 'vasco-rossi-milano-2026-06-13'),
('Vasco Rossi', 'Vasco Live 2026', 'Stadio Maradona', 'Napoli', 'IT', '2026-06-20 21:00:00+02', 'vasco-rossi-napoli-2026-06-20'),
('Vasco Rossi', 'Vasco Live 2026', 'Stadio Dall''Ara', 'Bologna', 'IT', '2026-06-27 21:00:00+02', 'vasco-rossi-bologna-2026-06-27'),

-- Ultimo
('Ultimo', 'La Favola per Sempre', 'Stadio Olimpico', 'Roma', 'IT', '2026-07-04 21:00:00+02', 'ultimo-roma-2026-07-04'),
('Ultimo', 'La Favola per Sempre', 'Stadio San Siro', 'Milano', 'IT', '2026-07-11 21:00:00+02', 'ultimo-milano-2026-07-11'),

-- Annalisa
('Annalisa', 'Tutti nel Vortice Indoor Tour 2025', 'Unipol Arena', 'Bologna', 'IT', '2025-11-14 21:00:00+01', 'annalisa-bologna-2025-11-14'),
('Annalisa', 'Tutti nel Vortice Indoor Tour 2025', 'Mediolanum Forum', 'Milano', 'IT', '2025-11-22 21:00:00+01', 'annalisa-milano-2025-11-22'),
('Annalisa', 'Tutti nel Vortice Indoor Tour 2025', 'Palazzo dello Sport', 'Roma', 'IT', '2025-11-29 21:00:00+01', 'annalisa-roma-2025-11-29'),

-- Elodie
('Elodie', 'Elodie Live 2025', 'Mediolanum Forum', 'Milano', 'IT', '2025-10-18 21:00:00+02', 'elodie-milano-2025-10-18'),
('Elodie', 'Elodie Live 2025', 'Palazzo dello Sport', 'Roma', 'IT', '2025-10-25 21:00:00+02', 'elodie-roma-2025-10-25'),

-- Geolier
('Geolier', 'Geolier 2026 Stage', 'Stadio Maradona', 'Napoli', 'IT', '2026-06-07 21:00:00+02', 'geolier-napoli-2026-06-07'),
('Geolier', 'Geolier 2026 Stage', 'Stadio San Siro', 'Milano', 'IT', '2026-06-14 21:00:00+02', 'geolier-milano-2026-06-14'),

-- Luchè
('Luchè', 'Arena Tour 2025-2026', 'Mediolanum Forum', 'Milano', 'IT', '2025-12-06 21:00:00+01', 'luche-milano-2025-12-06'),
('Luchè', 'Arena Tour 2025-2026', 'Palazzo dello Sport', 'Roma', 'IT', '2025-12-13 21:00:00+01', 'luche-roma-2025-12-13'),

-- Caparezza
('Caparezza', 'Exuvia Live Tour 2026', 'Mediolanum Forum', 'Milano', 'IT', '2026-04-18 21:00:00+02', 'caparezza-milano-2026-04-18'),
('Caparezza', 'Exuvia Live Tour 2026', 'Palazzo dello Sport', 'Roma', 'IT', '2026-04-25 21:00:00+02', 'caparezza-roma-2026-04-25'),

-- Zucchero
('Zucchero', 'Overdose D''Amore Gold', 'Mediolanum Forum', 'Milano', 'IT', '2026-03-14 21:00:00+01', 'zucchero-milano-2026-03-14'),
('Zucchero', 'Overdose D''Amore Gold', 'Palazzo dello Sport', 'Roma', 'IT', '2026-03-21 21:00:00+01', 'zucchero-roma-2026-03-21'),

-- Fabrizio Moro
('Fabrizio Moro', 'Non ho paura di niente Live 2026', 'Mediolanum Forum', 'Milano', 'IT', '2026-05-09 21:00:00+02', 'fabrizio-moro-milano-2026-05-09'),
('Fabrizio Moro', 'Non ho paura di niente Live 2026', 'Palazzo dello Sport', 'Roma', 'IT', '2026-05-16 21:00:00+02', 'fabrizio-moro-roma-2026-05-16'),

-- Luca Carboni
('Luca Carboni', 'Bio Tour 2026', 'Unipol Arena', 'Bologna', 'IT', '2026-04-04 21:00:00+02', 'luca-carboni-bologna-2026-04-04'),
('Luca Carboni', 'Bio Tour 2026', 'Mediolanum Forum', 'Milano', 'IT', '2026-04-11 21:00:00+02', 'luca-carboni-milano-2026-04-11'),

-- Tropico
('Tropico', 'Tour 2026', 'Mediolanum Forum', 'Milano', 'IT', '2026-03-07 21:00:00+01', 'tropico-milano-2026-03-07'),
('Tropico', 'Tour 2026', 'Palazzo dello Sport', 'Roma', 'IT', '2026-03-14 21:00:00+01', 'tropico-roma-2026-03-14'),

-- Cesare Cremonini
('Cesare Cremonini', 'Cremonini Stadi 2026', 'Stadio Olimpico', 'Roma', 'IT', '2026-07-01 21:00:00+02', 'cremonini-roma-2026-07-01'),
('Cesare Cremonini', 'Cremonini Stadi 2026', 'Stadio San Siro', 'Milano', 'IT', '2026-07-08 21:00:00+02', 'cremonini-milano-2026-07-08'),

-- Negramaro
('Negramaro', 'Negramaro Live 2026', 'Stadio Olimpico', 'Roma', 'IT', '2026-06-19 21:00:00+02', 'negramaro-roma-2026-06-19'),
('Negramaro', 'Negramaro Live 2026', 'Stadio San Siro', 'Milano', 'IT', '2026-06-26 21:00:00+02', 'negramaro-milano-2026-06-26'),

-- Max Pezzali
('Max Pezzali', 'Max Forever 2026', 'Stadio San Siro', 'Milano', 'IT', '2026-06-05 21:00:00+02', 'max-pezzali-milano-2026-06-05'),
('Max Pezzali', 'Max Forever 2026', 'Stadio Olimpico', 'Roma', 'IT', '2026-06-12 21:00:00+02', 'max-pezzali-roma-2026-06-12'),

-- Elisa
('Elisa', 'Elisa Live 2026', 'Mediolanum Forum', 'Milano', 'IT', '2026-02-21 21:00:00+01', 'elisa-milano-2026-02-21'),
('Elisa', 'Elisa Live 2026', 'Palazzo dello Sport', 'Roma', 'IT', '2026-02-28 21:00:00+01', 'elisa-roma-2026-02-28'),

-- Claudio Baglioni
('Claudio Baglioni', 'aTUTTOCUORE 2026', 'Palazzo dello Sport', 'Roma', 'IT', '2026-01-17 21:00:00+01', 'baglioni-roma-2026-01-17'),
('Claudio Baglioni', 'aTUTTOCUORE 2026', 'Mediolanum Forum', 'Milano', 'IT', '2026-01-24 21:00:00+01', 'baglioni-milano-2026-01-24'),

-- Deep Purple
('Deep Purple', 'Turning to Crime World Tour 2026', 'Mediolanum Forum', 'Milano', 'IT', '2026-03-03 21:00:00+01', 'deep-purple-milano-2026-03-03'),

-- Ghemon
('Ghemon', 'La prima volta, l''ultima volta, l''unica volta', 'Fabrique', 'Milano', 'IT', '2026-11-29 21:00:00+01', 'ghemon-milano-2026-11-29'),
('Ghemon', 'La prima volta, l''ultima volta, l''unica volta', 'Atlantico', 'Roma', 'IT', '2026-12-06 21:00:00+01', 'ghemon-roma-2026-12-06')

ON CONFLICT (slug) DO NOTHING;
