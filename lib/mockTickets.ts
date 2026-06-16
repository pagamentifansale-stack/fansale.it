// Shared mock ticket data used by /event/[slug]/tickets, /ticket/[ticketId], /checkout/[ticketId]
// and the new /tickets/all/[artistSlug]/[artistId]/[eventId] routes.
// Each event slug maps to event info + a record of tickets keyed by ticket id.

export interface MockTicket {
  id: string;
  offerId: number;          // numeric offer ID matching FanSALE pattern
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
  artistSlug: string;       // e.g. "geolier"
  artistId: number;         // numeric artist ID matching FanSALE pattern
  numericId: number;        // numeric event ID matching FanSALE pattern
  venue: string;
  city: string;
  date: string;             // display e.g. "07/06/2026"
  time: string;             // display e.g. "21:00"
  color: string;            // gradient class for banners
  resaleInfo: string;
  nameChangeInfo: string;
  deliveryInfo: string;
  tickets: Record<string, MockTicket>;
}

// ─── Artist registry ──────────────────────────────────────────────────────────

export const MOCK_ARTISTS: Record<
  string,
  {
    id: number;
    slug: string;
    name: string;
    bio: string;
    rating: number;
    ratingCount: number;
    color: string;
  }
> = {
  geolier: {
    id: 577164,
    slug: "geolier",
    name: "Geolier",
    bio: "Emanuele Palumbo, in arte Geolier, nasce il 26 marzo 2000 a Napoli. Rapper e cantante italiano, è uno degli artisti più ascoltati in Italia. Il suo stile mescola trap italiana e dialetto napoletano. Ha partecipato al Festival di Sanremo 2024 classificandosi secondo.",
    rating: 4.7,
    ratingCount: 654,
    color: "from-zinc-900 to-zinc-700",
  },
  "vasco-rossi": {
    id: 123456,
    slug: "vasco-rossi",
    name: "Vasco Rossi",
    bio: 'Vasco Rossi, nato il 7 febbraio 1952 a Zocca (MO), è uno dei più grandi artisti della musica italiana. Soprannominato "il Blasco", è noto per il suo stile rock e per i suoi concerti negli stadi. Ha venduto oltre 50 milioni di dischi in tutto il mondo.',
    rating: 4.9,
    ratingCount: 2341,
    color: "from-blue-900 to-blue-700",
  },
  ultimo: {
    id: 234567,
    slug: "ultimo",
    name: "Ultimo",
    bio: "Niccolò Moriconi, in arte Ultimo, nasce a Roma il 27 gennaio del 1996.\n\nDebutta nel 2017 con l'album Pianeti.\n\nNel 2018 vince Sanremo Giovani con Il ballo delle incertezze ed esce il secondo album Peter Pan. Nel 2019 pubblica il terzo disco Colpa delle favole e il 4 luglio si esibisce allo Stadio Olimpico di Roma con La Favola. Nel 2019 Ultimo è l'artista più ascoltato in Italia su Spotify e Apple Music. Il 22/10/21 esce il quarto album Solo, autoprodotto dalla sua etichetta Ultimo Records.\n\nDopo aver collaborato con Ed Sheeran nel brano 2step, a giugno 2022 prende il via Ultimo Stadi 2022, che con oltre 600.000 spettatori viene certificato diamante da SIAE. Con uno striscione esposto di fronte al Colosseo i suoi stessi fan lo ribattezzano \"Il principe degli stadi\". A febbraio 2023 esce l'album Alba, doppio disco di platino. Ultimo ha fin qui collezionato 84 dischi di platino e 18 dischi d'oro.",
    rating: 4.9,
    ratingCount: 1118,
    color: "from-red-900 to-red-700",
  },
  annalisa: {
    id: 345678,
    slug: "annalisa",
    name: "Annalisa",
    bio: "Annalisa Scarrone, in arte Annalisa, nasce il 5 agosto 1985 a Savona. Cantautrice e personaggio televisivo italiano, è diventata famosa grazie alla sua partecipazione ad Amici di Maria De Filippi nel 2011. Ha pubblicato numerosi album di successo e ha partecipato più volte al Festival di Sanremo.",
    rating: 4.8,
    ratingCount: 876,
    color: "from-pink-900 to-pink-700",
  },
  "bad-bunny": {
    id: 456789,
    slug: "bad-bunny",
    name: "Bad Bunny",
    bio: "Bad Bunny, all'anagrafe Benito Antonio Martínez Ocasio, nasce il 10 marzo 1994 a Vega Baja, Porto Rico. È uno dei più grandi artisti della musica latina mondiale, noto per il suo stile che fonde trap latina, reggaeton e urban pop. Ha vinto numerosi Grammy e Latin Grammy, ed è stato l'artista più ascoltato su Spotify per tre anni consecutivi. Il suo tour mondiale 2025 'DeBÍ TiRAR MáS FOToS' è uno degli eventi musicali più attesi dell'anno in Italia.",
    rating: 4.9,
    ratingCount: 3102,
    color: "from-yellow-900 to-yellow-700",
  },
  tropico: {
    id: 567890,
    slug: "tropico",
    name: "Tropico",
    bio: "Tropico è un cantautore italiano noto per il suo stile che fonde pop, R&B e sonorità mediterranee.",
    rating: 4.6,
    ratingCount: 312,
    color: "from-teal-900 to-teal-700",
  },
  "luca-carboni": {
    id: 678901,
    slug: "luca-carboni",
    name: "Luca Carboni",
    bio: "Luca Carboni, nato a Bologna nel 1962, è uno dei cantautori più amati della musica italiana. Con oltre 30 anni di carriera ha pubblicato numerosi album di successo.",
    rating: 4.7,
    ratingCount: 891,
    color: "from-orange-900 to-orange-700",
  },
  "fabrizio-moro": {
    id: 789012,
    slug: "fabrizio-moro",
    name: "Fabrizio Moro",
    bio: "Fabrizio Moro, nato a Roma nel 1975, è un cantautore italiano vincitore del Festival di Sanremo. Il suo stile si caratterizza per testi profondi e melodie intense.",
    rating: 4.8,
    ratingCount: 654,
    color: "from-stone-900 to-stone-700",
  },
  "deep-purple": {
    id: 890123,
    slug: "deep-purple",
    name: "Deep Purple",
    bio: "Deep Purple è una leggendaria rock band britannica fondata nel 1968. Considerati pionieri dell'hard rock e dell'heavy metal, hanno influenzato generazioni di musicisti.",
    rating: 4.9,
    ratingCount: 1543,
    color: "from-purple-900 to-purple-700",
  },
  zucchero: {
    id: 901234,
    slug: "zucchero",
    name: "Zucchero",
    bio: "Zucchero Sugar Fornaciari, nato a Reggio Emilia nel 1955, è uno dei più grandi artisti italiani nel mondo. Il suo blues-rock italiano lo ha reso famoso a livello internazionale.",
    rating: 4.8,
    ratingCount: 1102,
    color: "from-amber-900 to-amber-700",
  },
  luche: {
    id: 112233,
    slug: "luche",
    name: "Luchè",
    bio: "Luchè, all'anagrafe Luca Imprudente, è un rapper napoletano tra i più influenti della scena hip-hop italiana. Ha fatto parte del gruppo Co'Sang prima di intraprendere la carriera solista.",
    rating: 4.7,
    ratingCount: 423,
    color: "from-neutral-900 to-neutral-700",
  },
  caparezza: {
    id: 223344,
    slug: "caparezza",
    name: "Caparezza",
    bio: "Caparezza, all'anagrafe Michele Salvemini, è un rapper e cantautore pugliese noto per i suoi testi ironici e provocatori. È considerato uno degli artisti più originali della musica italiana.",
    rating: 4.8,
    ratingCount: 876,
    color: "from-lime-900 to-lime-700",
  },
  elodie: {
    id: 334455,
    slug: "elodie",
    name: "Elodie",
    bio: "Elodie Di Patrizi, in arte Elodie, nasce a Roma nel 1990. Cantante e personaggio televisivo italiano, è diventata famosa grazie ad Amici di Maria De Filippi. Il suo stile fonde pop, R&B e dance.",
    rating: 4.8,
    ratingCount: 743,
    color: "from-rose-900 to-rose-700",
  },
  elisa: {
    id: 445566,
    slug: "elisa",
    name: "Elisa",
    bio: "Elisa Toffoli, in arte Elisa, nasce a Trieste nel 1977. Cantautrice italiana di fama internazionale, ha vinto il Festival di Sanremo nel 2001 con 'Luce'. È considerata una delle voci più belle della musica italiana.",
    rating: 4.9,
    ratingCount: 1234,
    color: "from-sky-900 to-sky-700",
  },
  "cesare-cremonini": {
    id: 556677,
    slug: "cesare-cremonini",
    name: "Cesare Cremonini",
    bio: "Cesare Cremonini nasce a Bologna nel 1980. Cantautore e musicista italiano, è stato membro dei Lùnapop prima di intraprendere la carriera solista. È uno degli artisti più amati del panorama pop italiano.",
    rating: 4.8,
    ratingCount: 987,
    color: "from-indigo-900 to-indigo-700",
  },
  "claudio-baglioni": {
    id: 667788,
    slug: "claudio-baglioni",
    name: "Claudio Baglioni",
    bio: "Claudio Baglioni nasce a Roma nel 1951. Cantautore, compositore e polistrumentista italiano, è uno degli artisti più longevi e amati della musica italiana con oltre 50 anni di carriera.",
    rating: 4.9,
    ratingCount: 1876,
    color: "from-cyan-900 to-cyan-700",
  },
  negramaro: {
    id: 778899,
    slug: "negramaro",
    name: "Negramaro",
    bio: "I Negramaro sono un gruppo rock italiano fondato a Lecce nel 2000. Il loro stile fonde rock, pop e sonorità mediterranee. Sono considerati uno dei gruppi più importanti della musica italiana contemporanea.",
    rating: 4.8,
    ratingCount: 1102,
    color: "from-emerald-900 to-emerald-700",
  },
  "max-pezzali": {
    id: 889900,
    slug: "max-pezzali",
    name: "Max Pezzali",
    bio: "Massimiliano Pezzali, in arte Max Pezzali, nasce a Pavia nel 1967. Cantautore italiano, è stato membro degli 883 prima di intraprendere la carriera solista. Le sue canzoni sono la colonna sonora di intere generazioni.",
    rating: 4.8,
    ratingCount: 1345,
    color: "from-violet-900 to-violet-700",
  },
};

// ─── Event + ticket data ──────────────────────────────────────────────────────

export const MOCK_EVENT_TICKETS: Record<string, MockEvent> = {
  // ── Geolier ──────────────────────────────────────────────────────────────────
  "geolier-napoli-2026-06-26": {
    eventTitle: "Geolier - Stadi 2026",
    artist: "Geolier",
    artistSlug: "geolier",
    artistId: 577164,
    numericId: 20502678,
    venue: "Stadio Diego Armando Maradona",
    city: "Napoli",
    date: "26/06/2026",
    time: "21:00",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10544300, quantity: 3, section: "Prato Gold", isNumbered: false, is_nominative: true, price: 95.0, seller: { username: "geolier_gold", rating: 4.9, verified: true, successful_sales: 11 }, locked_until: null, description: "Package Prato Gold — 3 biglietti consecutivi. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, trasferimento tramite fanSALE." },
      "geolier-prato-gold-jun26": { id: "geolier-prato-gold-jun26", offerId: 10544316, quantity: 2, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "marco_napoli", rating: 4.8, verified: true, successful_sales: 23 }, locked_until: null, description: "2 biglietti Prato Gold Package — venerdì 26 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-jun26": { id: "geolier-prato-jun26", offerId: 10544318, quantity: 4, section: "Prato", isNumbered: false, is_nominative: true, price: 59.0, seller: { username: "sofia_fan", rating: 4.9, verified: true, successful_sales: 41 }, locked_until: null, description: "4 biglietti Prato — venerdì 26 giugno 2026. Posti non numerati, ottima posizione centrale. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-distinti-sup-jun26": { id: "geolier-distinti-sup-jun26", offerId: 10544330, quantity: 2, section: "Distinti Superiori", isNumbered: false, is_nominative: true, price: 45.0, seller: { username: "distinti_26", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "2 biglietti Distinti Superiori — venerdì 26 giugno 2026. Settore laterale superiore con ottima visuale sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-curva-a-jun26": { id: "geolier-curva-a-jun26", offerId: 10544333, quantity: 4, section: "Curva A", isNumbered: false, is_nominative: true, price: 39.0, seller: { username: "curva_a_26", rating: 4.6, verified: true, successful_sales: 6 }, locked_until: null, description: "4 biglietti Curva A — venerdì 26 giugno 2026. Settore curva lato palco. Biglietti nominativi, cambio nominativo disponibile." },
    },
  },
  "geolier-napoli-2026-06-27": {
    eventTitle: "Geolier - Stadi 2026",
    artist: "Geolier",
    artistSlug: "geolier",
    artistId: 577164,
    numericId: 20502679,
    venue: "Stadio Diego Armando Maradona",
    city: "Napoli",
    date: "27/06/2026",
    time: "21:00",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: {
      "geolier-prato-gold-jun27": { id: "geolier-prato-gold-jun27", offerId: 10544317, quantity: 3, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "luigi_tickets", rating: 4.7, verified: true, successful_sales: 15 }, locked_until: null, description: "3 biglietti Prato Gold Package — sabato 27 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-jun27": { id: "geolier-prato-jun27", offerId: 10544319, quantity: 2, section: "Prato", isNumbered: false, is_nominative: true, price: 59.0, seller: { username: "anna_concert", rating: 4.5, verified: false, successful_sales: 8 }, locked_until: null, description: "2 biglietti Prato — sabato 27 giugno 2026. Posti non numerati, ottima posizione centrale. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-distinti-sup-jun27": { id: "geolier-distinti-sup-jun27", offerId: 10544331, quantity: 2, section: "Distinti Superiori", isNumbered: false, is_nominative: true, price: 45.0, seller: { username: "distinti_27", rating: 4.8, verified: true, successful_sales: 12 }, locked_until: null, description: "2 biglietti Distinti Superiori — sabato 27 giugno 2026. Settore laterale superiore con ottima visuale sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-curva-a-jun27": { id: "geolier-curva-a-jun27", offerId: 10544334, quantity: 4, section: "Curva A", isNumbered: false, is_nominative: true, price: 39.0, seller: { username: "curva_a_27", rating: 4.7, verified: true, successful_sales: 8 }, locked_until: null, description: "4 biglietti Curva A — sabato 27 giugno 2026. Settore curva lato palco. Biglietti nominativi, cambio nominativo disponibile." },
    },
  },
  "geolier-napoli-2026-06-28": {
    eventTitle: "Geolier - Stadi 2026",
    artist: "Geolier",
    artistSlug: "geolier",
    artistId: 577164,
    numericId: 20502680,
    venue: "Stadio Diego Armando Maradona",
    city: "Napoli",
    date: "28/06/2026",
    time: "21:00",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: {
      "geolier-prato-gold-jun28": { id: "geolier-prato-gold-jun28", offerId: 10544321, quantity: 2, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "napoli_gold28", rating: 4.9, verified: true, successful_sales: 19 }, locked_until: null, description: "2 biglietti Prato Gold Package — domenica 28 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-gold-jun28-b": { id: "geolier-prato-gold-jun28-b", offerId: 10544322, quantity: 3, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "fan_gold_28", rating: 4.8, verified: true, successful_sales: 7 }, locked_until: null, description: "3 biglietti Prato Gold Package — domenica 28 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-gold-jun28-c": { id: "geolier-prato-gold-jun28-c", offerId: 10544323, quantity: 4, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "gruppo_gold28", rating: 4.7, verified: true, successful_sales: 5 }, locked_until: null, description: "4 biglietti Prato Gold Package — domenica 28 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-gold-jun28-d": { id: "geolier-prato-gold-jun28-d", offerId: 10544324, quantity: 1, section: "Prato Gold Package", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "solo_gold28", rating: 4.6, verified: false, successful_sales: 2 }, locked_until: null, description: "1 biglietto Prato Gold Package — domenica 28 giugno 2026. Accesso area premium con visuale diretta sul palco. Biglietto nominativo, cambio nominativo disponibile." },
      "geolier-prato-jun28": { id: "geolier-prato-jun28", offerId: 10544320, quantity: 3, section: "Prato", isNumbered: false, is_nominative: true, price: 59.0, seller: { username: "roberto_vip", rating: 5.0, verified: true, successful_sales: 67 }, locked_until: null, description: "3 biglietti Prato — domenica 28 giugno 2026. Posti non numerati, ottima posizione centrale. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-prato-jun28-solo": { id: "geolier-prato-jun28-solo", offerId: 10544325, quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 59.0, seller: { username: "prato_solo28", rating: 4.7, verified: true, successful_sales: 4 }, locked_until: null, description: "1 biglietto Prato — domenica 28 giugno 2026. Posto non numerato, ottima posizione centrale. Biglietto nominativo, cambio nominativo disponibile." },
      "geolier-distinti-sup-jun28": { id: "geolier-distinti-sup-jun28", offerId: 10544332, quantity: 2, section: "Distinti Superiori", isNumbered: false, is_nominative: true, price: 45.0, seller: { username: "distinti_28", rating: 4.6, verified: true, successful_sales: 5 }, locked_until: null, description: "2 biglietti Distinti Superiori — domenica 28 giugno 2026. Settore laterale superiore con ottima visuale sul palco. Biglietti nominativi, cambio nominativo disponibile." },
      "geolier-curva-a-jun28": { id: "geolier-curva-a-jun28", offerId: 10544335, quantity: 4, section: "Curva A", isNumbered: false, is_nominative: true, price: 39.0, seller: { username: "curva_a_28", rating: 4.5, verified: false, successful_sales: 3 }, locked_until: null, description: "4 biglietti Curva A — domenica 28 giugno 2026. Settore curva lato palco. Biglietti nominativi, cambio nominativo disponibile." },
    },
  },
  "geolier-napoli-2026-06-07": {
    eventTitle: "Geolier - 2026 Stage",
    artist: "Geolier",
    artistSlug: "geolier",
    artistId: 577164,
    numericId: 20502670,
    venue: "Stadio Maradona",
    city: "Napoli",
    date: "07/06/2026",
    time: "21:00",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10544301, quantity: 1, section: "Curva A", isNumbered: false, is_nominative: true, price: 65.0, seller: { username: "napoli_fan99", rating: 4.9, verified: true, successful_sales: 8 }, locked_until: null, description: "Biglietto in Curva A, ottima visuale. Nominativo, trasferimento tramite fanSALE." },
      t2: { id: "t2", offerId: 10544302, quantity: 2, section: "Tribuna Posillipo", row: "Fila 9", seatNumber: 5, isNumbered: true, is_nominative: true, price: 68.0, seller: { username: "geolierfan", rating: 4.7, verified: true, successful_sales: 3 }, locked_until: null, description: "Due biglietti consecutivi in Tribuna Posillipo, Fila 9." },
      t3: { id: "t3", offerId: 10544303, quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 62.0, seller: { username: "concertlover", rating: 4.5, verified: false, successful_sales: 1 }, locked_until: null, description: "Biglietto prato, posto non numerato. Ottima posizione centrale." },
      t4: { id: "t4", offerId: 10544304, quantity: 4, section: "Curva B", isNumbered: false, is_nominative: true, price: 65.0, seller: { username: "marco_fan", rating: 4.8, verified: true, successful_sales: 12 }, locked_until: null, description: "Quattro biglietti in Curva B, posti vicini." },
    },
  },
  "geolier-milano-2026-06-14": {
    eventTitle: "Geolier - 2026 Stage",
    artist: "Geolier",
    artistSlug: "geolier",
    artistId: 577164,
    numericId: 20502671,
    venue: "Stadio San Siro",
    city: "Milano",
    date: "14/06/2026",
    time: "21:00",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10544305, quantity: 1, section: "Secondo Anello Verde", isNumbered: false, is_nominative: true, price: 68.0, seller: { username: "siro_fan", rating: 4.8, verified: true, successful_sales: 5 }, locked_until: null, description: "Biglietto Secondo Anello Verde, visuale perfetta." },
      t2: { id: "t2", offerId: 10544306, quantity: 2, section: "Prato", isNumbered: false, is_nominative: true, price: 65.0, seller: { username: "milanofan", rating: 4.6, verified: true, successful_sales: 7 }, locked_until: null, description: "Due biglietti prato, posizione centrale." },
      t3: { id: "t3", offerId: 10544307, quantity: 1, section: "Primo Anello Arancio", row: "Fila 5", seat: "Posto 28", seatNumber: 28, isNumbered: true, is_nominative: true, price: 72.0, seller: { username: "geolier_mi", rating: 4.9, verified: true, successful_sales: 15 }, locked_until: null, description: "Posto numerato Primo Anello Arancio, Fila 5 Posto 28. Vista eccellente." },
      t4: { id: "t4", offerId: 10544308, quantity: 3, section: "Secondo Anello Rosso", isNumbered: false, is_nominative: true, price: 68.0, seller: { username: "trio_fan", rating: 4.7, verified: true, successful_sales: 4 }, locked_until: null, description: "Tre biglietti consecutivi Secondo Anello Rosso." },
    },
  },

  // ── Bad Bunny ─────────────────────────────────────────────────────────────────
  "bad-bunny-milano-2025-07-10": {
    eventTitle: "Bad Bunny - DeBÍ TiRAR MáS FOToS Tour",
    artist: "Bad Bunny",
    artistSlug: "bad-bunny",
    artistId: 456789,
    numericId: 20400100,
    venue: "Stadio San Siro",
    city: "Milano",
    date: "10/07/2025",
    time: "21:00",
    color: "from-yellow-900 to-yellow-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 maggio 2025 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 maggio 2025 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 maggio 2025.",
    tickets: {
      t1: { id: "t1", offerId: 10400001, quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "bunny_fan1", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto prato Bad Bunny Milano." },
      t2: { id: "t2", offerId: 10400002, quantity: 2, section: "Secondo Anello Verde", row: "Fila 10", seatNumber: 12, isNumbered: true, is_nominative: true, price: 90.0, seller: { username: "siro_bb", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Due biglietti Secondo Anello Verde, Fila 10." },
      t3: { id: "t3", offerId: 10400003, quantity: 1, section: "Primo Anello Arancio", row: "Fila 4", seat: "Posto 18", seatNumber: 18, isNumbered: true, is_nominative: true, price: 95.0, seller: { username: "vip_seat", rating: 4.9, verified: true, successful_sales: 20 }, locked_until: null, description: "Posto numerato premium Primo Anello Arancio." },
      t4: { id: "t4", offerId: 10400004, quantity: 4, section: "Prato", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "group_fan", rating: 4.6, verified: true, successful_sales: 3 }, locked_until: null, description: "Quattro biglietti prato consecutivi." },
    },
  },
  "bad-bunny-roma-2025-07-13": {
    eventTitle: "Bad Bunny - DeBÍ TiRAR MáS FOToS Tour",
    artist: "Bad Bunny",
    artistSlug: "bad-bunny",
    artistId: 456789,
    numericId: 20400101,
    venue: "Stadio Olimpico",
    city: "Roma",
    date: "13/07/2025",
    time: "21:00",
    color: "from-yellow-900 to-yellow-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 maggio 2025 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 maggio 2025 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 maggio 2025.",
    tickets: {
      t1: { id: "t1", offerId: 10400005, quantity: 1, section: "Curva Nord", isNumbered: false, is_nominative: true, price: 88.0, seller: { username: "roma_bb", rating: 4.8, verified: true, successful_sales: 4 }, locked_until: null, description: "Biglietto Curva Nord Stadio Olimpico." },
      t2: { id: "t2", offerId: 10400006, quantity: 2, section: "Tribuna Monte Mario", row: "Fila 8", seatNumber: 20, isNumbered: true, is_nominative: true, price: 92.0, seller: { username: "olimpico_fan", rating: 4.7, verified: true, successful_sales: 11 }, locked_until: null, description: "Due biglietti Tribuna Monte Mario, Fila 8." },
      t3: { id: "t3", offerId: 10400007, quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 88.0, seller: { username: "prato_roma", rating: 4.5, verified: false, successful_sales: 2 }, locked_until: null, description: "Biglietto prato Roma." },
      t4: { id: "t4", offerId: 10400008, quantity: 3, section: "Curva Sud", isNumbered: false, is_nominative: true, price: 85.0, seller: { username: "curva_fan", rating: 4.6, verified: true, successful_sales: 7 }, locked_until: null, description: "Tre biglietti Curva Sud." },
    },
  },

  // ── Ultimo ────────────────────────────────────────────────────────────────────
  "ultimo-milano-2026-07-11": {
    eventTitle: "Ultimo - La Favola per Sempre",
    artist: "Ultimo",
    artistSlug: "ultimo",
    artistId: 234567,
    numericId: 20600200,
    venue: "Stadio San Siro",
    city: "Milano",
    date: "11/07/2026",
    time: "20:30",
    color: "from-red-900 to-red-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 4 maggio 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 4 maggio 2026 fino a 48h prima dell'evento. Sarà possibile effettuare un solo cambio nominativo al link dedicato www.ticketone.it/cambionomeultimo2026",
    deliveryInfo: "Come stabilito dall'organizzatore, la consegna dei biglietti verrà effettuata a partire dal 4 maggio 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10600001, quantity: 1, section: "Secondo Anello Verde", isNumbered: false, is_nominative: true, price: 95.0, seller: { username: "ultimo_mi", rating: 4.9, verified: true, successful_sales: 10 }, locked_until: null, description: "Biglietto Secondo Anello Verde." },
      t2: { id: "t2", offerId: 10600002, quantity: 2, section: "Prato", isNumbered: false, is_nominative: true, price: 90.0, seller: { username: "prato_mi", rating: 4.7, verified: true, successful_sales: 5 }, locked_until: null, description: "Due biglietti prato." },
      t3: { id: "t3", offerId: 10600003, quantity: 1, section: "Primo Anello Arancio", row: "Fila 7", seat: "Posto 15", seatNumber: 15, isNumbered: true, is_nominative: true, price: 98.0, seller: { username: "vip_ultimo", rating: 4.8, verified: true, successful_sales: 8 }, locked_until: null, description: "Posto numerato premium Primo Anello Arancio, Fila 7 Posto 15." },
    },
  },
  "ultimo-roma-2026-07-04": {
    eventTitle: "Ultimo - La Favola per Sempre",
    artist: "Ultimo",
    artistSlug: "ultimo",
    artistId: 234567,
    numericId: 20600201,
    venue: "Tor Vergata",
    city: "Roma",
    date: "04/07/2026",
    time: "20:30",
    color: "from-red-900 to-red-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 4 maggio 2026 fino a 48h prima dell'evento. Per una panoramica su settori e prezzi, consulta la mappa",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 4 maggio 2026 fino a 48h prima dell'evento. Sarà possibile effettuare un solo cambio nominativo al link dedicato www.ticketone.it/cambionomeultimo2026",
    deliveryInfo: "Come stabilito dall'organizzatore, la consegna dei biglietti (tramite Corriere Espresso, Stampa@Casa o eTicket) verrà effettuata a partire dal 4 maggio 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10600004, quantity: 1, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 77.28, seller: { username: "ultimo_ro", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto posto unico." },
      t2: { id: "t2", offerId: 10600005, quantity: 2, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 90.16, seller: { username: "coppia_ro", rating: 4.6, verified: true, successful_sales: 3 }, locked_until: null, description: "Due biglietti posto unico." },
      t3: { id: "t3", offerId: 10600006, quantity: 1, section: "Settore A", row: "Fila 5", seat: "Posto 12", seatNumber: 12, isNumbered: true, is_nominative: true, price: 82.0, seller: { username: "settore_a", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Posto numerato Settore A, Fila 5 Posto 12." },
      t4: { id: "t4", offerId: 10600007, quantity: 3, section: "Settore B", isNumbered: false, is_nominative: true, price: 77.28, seller: { username: "trio_ro", rating: 4.5, verified: false, successful_sales: 1 }, locked_until: null, description: "Tre biglietti Settore B." },
    },
  },

  // ── Annalisa ──────────────────────────────────────────────────────────────────
  "annalisa-bologna-2025-11-14": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour",
    artist: "Annalisa",
    artistSlug: "annalisa",
    artistId: 345678,
    numericId: 20700300,
    venue: "Unipol Arena",
    city: "Bologna",
    date: "14/11/2025",
    time: "21:00",
    color: "from-pink-900 to-pink-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 settembre 2025 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 settembre 2025 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 settembre 2025.",
    tickets: {
      t1: { id: "t1", offerId: 10700001, quantity: 1, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 45.0, seller: { username: "anna_bo", rating: 4.8, verified: true, successful_sales: 5 }, locked_until: null, description: "Biglietto posto unico Unipol Arena." },
      t2: { id: "t2", offerId: 10700002, quantity: 2, section: "Settore A", row: "Fila 4", seatNumber: 8, isNumbered: true, is_nominative: true, price: 48.0, seller: { username: "vortice_bo", rating: 4.7, verified: true, successful_sales: 7 }, locked_until: null, description: "Due biglietti Settore A, Fila 4." },
      t3: { id: "t3", offerId: 10700003, quantity: 1, section: "Tribuna Numerata", row: "Fila 2", seat: "Posto 8", seatNumber: 8, isNumbered: true, is_nominative: true, price: 50.0, seller: { username: "tribuna_bo", rating: 4.9, verified: true, successful_sales: 14 }, locked_until: null, description: "Posto numerato Tribuna, Fila 2 Posto 8." },
    },
  },
  "annalisa-milano-2025-11-22": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour",
    artist: "Annalisa",
    artistSlug: "annalisa",
    artistId: 345678,
    numericId: 20700301,
    venue: "Mediolanum Forum",
    city: "Milano",
    date: "22/11/2025",
    time: "21:00",
    color: "from-pink-900 to-pink-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 settembre 2025 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 settembre 2025 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 settembre 2025.",
    tickets: {
      t1: { id: "t1", offerId: 10700004, quantity: 1, section: "Parterre in Piedi", isNumbered: false, is_nominative: true, price: 48.5, seller: { username: "anna_mi", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto parterre in piedi." },
      t2: { id: "t2", offerId: 10700005, quantity: 2, section: "Settore B", row: "Fila 6", seatNumber: 10, isNumbered: true, is_nominative: true, price: 50.0, seller: { username: "forum_fan", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Due biglietti Settore B, Fila 6." },
      t3: { id: "t3", offerId: 10700006, quantity: 1, section: "Tribuna Centrale", row: "Fila 1", seat: "Posto 12", seatNumber: 12, isNumbered: true, is_nominative: true, price: 55.0, seller: { username: "tribuna_mi", rating: 4.9, verified: true, successful_sales: 18 }, locked_until: null, description: "Posto premium Tribuna Centrale, Fila 1 Posto 12." },
      t4: { id: "t4", offerId: 10700007, quantity: 3, section: "Parterre in Piedi", isNumbered: false, is_nominative: true, price: 48.5, seller: { username: "trio_mi", rating: 4.6, verified: true, successful_sales: 4 }, locked_until: null, description: "Tre biglietti parterre in piedi." },
    },
  },
  "annalisa-roma-2025-11-29": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour",
    artist: "Annalisa",
    artistSlug: "annalisa",
    artistId: 345678,
    numericId: 20700302,
    venue: "Palazzo dello Sport",
    city: "Roma",
    date: "29/11/2025",
    time: "21:00",
    color: "from-pink-900 to-pink-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 settembre 2025 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 settembre 2025 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 settembre 2025.",
    tickets: {
      t1: { id: "t1", offerId: 10700008, quantity: 1, section: "Posto Unico", isNumbered: false, is_nominative: true, price: 46.0, seller: { username: "anna_ro", rating: 4.8, verified: true, successful_sales: 5 }, locked_until: null, description: "Biglietto posto unico." },
      t2: { id: "t2", offerId: 10700009, quantity: 2, section: "Settore C", row: "Fila 5", seatNumber: 14, isNumbered: true, is_nominative: true, price: 48.0, seller: { username: "sport_ro", rating: 4.7, verified: true, successful_sales: 6 }, locked_until: null, description: "Due biglietti Settore C, Fila 5." },
      t3: { id: "t3", offerId: 10700010, quantity: 1, section: "Tribuna Numerata", row: "Fila 3", seat: "Posto 19", seatNumber: 19, isNumbered: true, is_nominative: true, price: 52.0, seller: { username: "tribuna_ro", rating: 4.9, verified: true, successful_sales: 11 }, locked_until: null, description: "Posto numerato Tribuna, Fila 3 Posto 19." },
    },
  },

  // ── Vasco Rossi ───────────────────────────────────────────────────────────────
  "vasco-rossi-roma-2026-06-06": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    artistId: 123456,
    numericId: 20800400,
    venue: "Stadio Olimpico",
    city: "Roma",
    date: "06/06/2026",
    time: "21:00",
    color: "from-blue-900 to-blue-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10800001, quantity: 1, section: "Curva Nord", isNumbered: false, is_nominative: true, price: 89.5, seller: { username: "vasco_ro", rating: 4.8, verified: true, successful_sales: 7 }, locked_until: null, description: "Biglietto Curva Nord Stadio Olimpico." },
      t2: { id: "t2", offerId: 10800002, quantity: 2, section: "Tribuna", row: "Fila 10", seatNumber: 5, isNumbered: true, is_nominative: true, price: 94.0, seller: { username: "olimpico_v", rating: 4.7, verified: true, successful_sales: 10 }, locked_until: null, description: "Due biglietti Tribuna, Fila 10." },
      t3: { id: "t3", offerId: 10800003, quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 79.0, seller: { username: "prato_v", rating: 4.5, verified: false, successful_sales: 2 }, locked_until: null, description: "Biglietto prato." },
    },
  },
  "vasco-rossi-milano-2026-06-13": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    artistId: 123456,
    numericId: 20800401,
    venue: "Stadio San Siro",
    city: "Milano",
    date: "13/06/2026",
    time: "21:00",
    color: "from-blue-900 to-blue-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10800004, quantity: 1, section: "Secondo Anello Verde", isNumbered: false, is_nominative: true, price: 94.0, seller: { username: "vasco_mi", rating: 4.8, verified: true, successful_sales: 9 }, locked_until: null, description: "Biglietto Secondo Anello Verde." },
      t2: { id: "t2", offerId: 10800005, quantity: 2, section: "Primo Anello Arancio", row: "Fila 12", seatNumber: 8, isNumbered: true, is_nominative: true, price: 98.0, seller: { username: "siro_v", rating: 4.7, verified: true, successful_sales: 13 }, locked_until: null, description: "Due biglietti Primo Anello Arancio, Fila 12." },
      t3: { id: "t3", offerId: 10800006, quantity: 3, section: "Prato", isNumbered: false, is_nominative: true, price: 90.0, seller: { username: "prato_mi_v", rating: 4.6, verified: true, successful_sales: 5 }, locked_until: null, description: "Tre biglietti prato." },
      t4: { id: "t4", offerId: 10800007, quantity: 1, section: "Tribuna Numerata", row: "Fila 3", seat: "Posto 22", seatNumber: 22, isNumbered: true, is_nominative: true, price: 105.0, seller: { username: "tribuna_v", rating: 4.9, verified: true, successful_sales: 16 }, locked_until: null, description: "Posto premium Tribuna Numerata, Fila 3 Posto 22." },
    },
  },
  "vasco-rossi-napoli-2026-06-20": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    artistId: 123456,
    numericId: 20800402,
    venue: "Stadio Maradona",
    city: "Napoli",
    date: "20/06/2026",
    time: "21:00",
    color: "from-blue-900 to-blue-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10800008, quantity: 1, section: "Curva Sud", isNumbered: false, is_nominative: true, price: 79.0, seller: { username: "vasco_na", rating: 4.8, verified: true, successful_sales: 6 }, locked_until: null, description: "Biglietto Curva Sud Stadio Maradona." },
      t2: { id: "t2", offerId: 10800009, quantity: 2, section: "Tribuna Laterale", row: "Fila 8", seatNumber: 15, isNumbered: true, is_nominative: true, price: 82.0, seller: { username: "maradona_v", rating: 4.7, verified: true, successful_sales: 8 }, locked_until: null, description: "Due biglietti Tribuna Laterale, Fila 8." },
      t3: { id: "t3", offerId: 10800010, quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 75.0, seller: { username: "prato_na", rating: 4.5, verified: false, successful_sales: 1 }, locked_until: null, description: "Biglietto prato." },
    },
  },
  "vasco-rossi-bologna-2026-06-27": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    artistId: 123456,
    numericId: 20800403,
    venue: "Stadio Dall'Ara",
    city: "Bologna",
    date: "27/06/2026",
    time: "21:00",
    color: "from-blue-900 to-blue-700",
    resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: {
      t1: { id: "t1", offerId: 10800011, quantity: 1, section: "Curva Andrea Costa", isNumbered: false, is_nominative: true, price: 82.0, seller: { username: "vasco_bo", rating: 4.8, verified: true, successful_sales: 7 }, locked_until: null, description: "Biglietto Curva Andrea Costa." },
      t2: { id: "t2", offerId: 10800012, quantity: 2, section: "Tribuna Centrale", row: "Fila 6", seatNumber: 10, isNumbered: true, is_nominative: true, price: 85.0, seller: { username: "dallara_v", rating: 4.7, verified: true, successful_sales: 9 }, locked_until: null, description: "Due biglietti Tribuna Centrale, Fila 6." },
      t3: { id: "t3", offerId: 10800013, quantity: 1, section: "Prato", isNumbered: false, is_nominative: true, price: 78.0, seller: { username: "prato_bo", rating: 4.5, verified: false, successful_sales: 2 }, locked_until: null, description: "Biglietto prato." },
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
  artistSlug: "geolier",
  artistId: 577164,
  numericId: 20502677,
  venue: "Stadio Diego Armando Maradona",
  city: "Napoli",
  date: "26–28/06/2026",
  time: "21:00",
  color: "from-zinc-900 to-zinc-700",
  resaleInfo: "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
  nameChangeInfo: "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
  deliveryInfo: "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
  tickets: GEOLIER_NAPOLI_2026_TICKETS,
};

// ─── Legacy lookup (slug + ticketId) ─────────────────────────────────────────

export function getMockTicketData(eventSlug: string, ticketId: string) {
  const event = MOCK_EVENT_TICKETS[eventSlug];
  if (!event) return null;
  const ticket = event.tickets[ticketId];
  if (!ticket) return null;
  return { event, ticket };
}

// ─── New numeric-ID lookup helpers ───────────────────────────────────────────

/** Get artist metadata by slug (e.g. "geolier") */
export function getArtistBySlug(slug: string) {
  return MOCK_ARTISTS[slug] ?? null;
}

/** Get artist metadata by numeric ID */
export function getArtistById(artistId: number) {
  return Object.values(MOCK_ARTISTS).find((a) => a.id === artistId) ?? null;
}

/** Get all events for a given numeric artistId */
export function getEventsByArtistId(artistId: number): MockEvent[] {
  return Object.values(MOCK_EVENT_TICKETS).filter(
    (e) => e.artistId === artistId && e.numericId !== 20502677, // exclude the merged aggregate
  );
}

/** Get a single event by its numeric eventId */
export function getEventByNumericId(eventId: number): MockEvent | null {
  return Object.values(MOCK_EVENT_TICKETS).find((e) => e.numericId === eventId) ?? null;
}

/** Get all tickets for a given numeric eventId */
export function getTicketsByEventNumericId(eventId: number): MockTicket[] {
  const event = getEventByNumericId(eventId);
  if (!event) return [];
  return Object.values(event.tickets);
}

/** Get a single ticket by its numeric offerId */
export function getTicketByOfferId(offerId: number): { event: MockEvent; ticket: MockTicket } | null {
  for (const event of Object.values(MOCK_EVENT_TICKETS)) {
    for (const ticket of Object.values(event.tickets)) {
      if (ticket.offerId === offerId) return { event, ticket };
    }
  }
  return null;
}
