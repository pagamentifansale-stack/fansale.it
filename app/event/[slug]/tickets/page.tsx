"use client";
import { Suspense, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle,
  Handshake,
  ChevronLeft,
  MapPin,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getArtistImage } from "@/lib/images";

// Mock ticket listings — replace with Supabase fetch by event slug
const EVENT_TICKETS: Record<
  string,
  {
    eventTitle: string;
    artist: string;
    artistSlug: string;
    dayName: string;
    date: string;
    time: string;
    venue: string;
    city: string;
    color: string;
    resaleInfo: string;
    nameChangeInfo: string;
    deliveryInfo: string;
    tickets: Array<{
      id: string;
      quantity: number;
      section: string;
      row?: string;
      seat?: string;
      price: number;
      totalPrice: number;
      verified: boolean;
      fairDeal: boolean;
    }>;
  }
> = {
  "bad-bunny-milano-2025-07-10": {
    eventTitle: "Bad Bunny - DeBÍ TiRAR MáS FOToS Tour",
    artist: "Bad Bunny",
    artistSlug: "bad-bunny",
    dayName: "giovedì",
    date: "10/07/2025",
    time: "21.00",
    venue: "Stadio San Siro",
    city: "MILANO",
    color: "from-yellow-900 to-yellow-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 maggio 2025 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 maggio 2025 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 maggio 2025.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Prato",
        price: 85.0,
        totalPrice: 85.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Secondo Anello Verde",
        row: "Fila 10",
        price: 90.0,
        totalPrice: 180.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Primo Anello Arancio",
        row: "Fila 4",
        seat: "Posto 18",
        price: 95.0,
        totalPrice: 95.0,
        verified: true,
        fairDeal: false,
      },
      {
        id: "t4",
        quantity: 4,
        section: "Prato",
        price: 85.0,
        totalPrice: 340.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "bad-bunny-roma-2025-07-13": {
    eventTitle: "Bad Bunny - DeBÍ TiRAR MáS FOToS Tour",
    artist: "Bad Bunny",
    artistSlug: "bad-bunny",
    dayName: "domenica",
    date: "13/07/2025",
    time: "21.00",
    venue: "Stadio Olimpico",
    city: "ROMA",
    color: "from-yellow-900 to-yellow-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 maggio 2025 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 maggio 2025 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 maggio 2025.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Curva Nord",
        price: 88.0,
        totalPrice: 88.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Tribuna Monte Mario",
        row: "Fila 8",
        price: 92.0,
        totalPrice: 184.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Prato",
        price: 88.0,
        totalPrice: 88.0,
        verified: true,
        fairDeal: false,
      },
      {
        id: "t4",
        quantity: 3,
        section: "Curva Sud",
        price: 85.0,
        totalPrice: 255.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "ultimo-milano-2026-07-11": {
    eventTitle: "Ultimo - La Favola per Sempre",
    artist: "Ultimo",
    artistSlug: "ultimo",
    dayName: "sabato",
    date: "11/07/2026",
    time: "20.30",
    venue: "Stadio San Siro",
    city: "MILANO",
    color: "from-red-900 to-red-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 4 maggio 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 4 maggio 2026 fino a 48h prima dell'evento. Sarà possibile effettuare un solo cambio nominativo al link dedicato www.ticketone.it/cambionomeultimo2026",
    deliveryInfo:
      "Come stabilito dall'organizzatore, la consegna dei biglietti verrà effettuata a partire dal 4 maggio 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Secondo Anello Verde",
        price: 95.0,
        totalPrice: 95.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Prato",
        price: 90.0,
        totalPrice: 180.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Primo Anello Arancio",
        row: "Fila 7",
        seat: "Posto 15",
        price: 98.0,
        totalPrice: 98.0,
        verified: true,
        fairDeal: false,
      },
    ],
  },
  "annalisa-bologna-2025-11-14": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour",
    artist: "Annalisa",
    artistSlug: "annalisa",
    dayName: "venerdì",
    date: "14/11/2025",
    time: "21.00",
    venue: "Unipol Arena",
    city: "BOLOGNA",
    color: "from-pink-900 to-pink-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 settembre 2025 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 settembre 2025 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 settembre 2025.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Posto Unico",
        price: 45.0,
        totalPrice: 45.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Settore A",
        row: "Fila 4",
        price: 48.0,
        totalPrice: 96.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Tribuna Numerata",
        row: "Fila 2",
        seat: "Posto 8",
        price: 50.0,
        totalPrice: 50.0,
        verified: true,
        fairDeal: false,
      },
    ],
  },
  "annalisa-milano-2025-11-22": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour",
    artist: "Annalisa",
    artistSlug: "annalisa",
    dayName: "sabato",
    date: "22/11/2025",
    time: "21.00",
    venue: "Mediolanum Forum",
    city: "MILANO",
    color: "from-pink-900 to-pink-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 settembre 2025 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 settembre 2025 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 settembre 2025.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Parterre in Piedi",
        price: 48.5,
        totalPrice: 48.5,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Settore B",
        row: "Fila 6",
        price: 50.0,
        totalPrice: 100.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Tribuna Centrale",
        row: "Fila 1",
        seat: "Posto 12",
        price: 55.0,
        totalPrice: 55.0,
        verified: true,
        fairDeal: false,
      },
      {
        id: "t4",
        quantity: 3,
        section: "Parterre in Piedi",
        price: 48.5,
        totalPrice: 145.5,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "annalisa-roma-2025-11-29": {
    eventTitle: "Annalisa - Tutti nel Vortice Tour",
    artist: "Annalisa",
    artistSlug: "annalisa",
    dayName: "sabato",
    date: "29/11/2025",
    time: "21.00",
    venue: "Palazzo dello Sport",
    city: "ROMA",
    color: "from-pink-900 to-pink-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 settembre 2025 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 settembre 2025 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 settembre 2025.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Posto Unico",
        price: 46.0,
        totalPrice: 46.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Settore C",
        row: "Fila 5",
        price: 48.0,
        totalPrice: 96.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Tribuna Numerata",
        row: "Fila 3",
        seat: "Posto 19",
        price: 52.0,
        totalPrice: 52.0,
        verified: true,
        fairDeal: false,
      },
    ],
  },
  "geolier-napoli-2026": {
    eventTitle: "Geolier - Stadi 2026",
    artist: "Geolier",
    artistSlug: "geolier",
    dayName: "venerdì–domenica",
    date: "26–28/06/2026",
    time: "21.00",
    venue: "Stadio Diego Armando Maradona",
    city: "NAPOLI",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: [
      {
        id: "geolier-prato-gold-jun26",
        quantity: 2,
        section: "Prato Gold Package",
        row: "26 giu",
        price: 85.0,
        totalPrice: 170.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "geolier-prato-gold-jun27",
        quantity: 3,
        section: "Prato Gold Package",
        row: "27 giu",
        price: 85.0,
        totalPrice: 255.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "geolier-prato-jun26",
        quantity: 4,
        section: "Prato",
        row: "26 giu",
        price: 59.0,
        totalPrice: 236.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "geolier-prato-jun27",
        quantity: 2,
        section: "Prato",
        row: "27 giu",
        price: 59.0,
        totalPrice: 118.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "geolier-prato-jun28",
        quantity: 3,
        section: "Prato",
        row: "28 giu",
        price: 59.0,
        totalPrice: 177.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "geolier-napoli-2026-06-26": {
    eventTitle: "Geolier - Stadi 2026",
    artist: "Geolier",
    artistSlug: "geolier",
    dayName: "venerdì",
    date: "26/06/2026",
    time: "21.00",
    venue: "Stadio Diego Armando Maradona",
    city: "NAPOLI",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 3,
        section: "Prato Gold",
        price: 95.0,
        totalPrice: 285.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "geolier-prato-gold-jun26",
        quantity: 2,
        section: "Prato Gold Package",
        price: 85.0,
        totalPrice: 170.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "geolier-prato-jun26",
        quantity: 4,
        section: "Prato",
        price: 59.0,
        totalPrice: 236.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "geolier-napoli-2026-06-27": {
    eventTitle: "Geolier - Stadi 2026",
    artist: "Geolier",
    artistSlug: "geolier",
    dayName: "sabato",
    date: "27/06/2026",
    time: "21.00",
    venue: "Stadio Diego Armando Maradona",
    city: "NAPOLI",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: [
      {
        id: "geolier-prato-gold-jun27",
        quantity: 3,
        section: "Prato Gold Package",
        price: 85.0,
        totalPrice: 255.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "geolier-prato-jun27",
        quantity: 2,
        section: "Prato",
        price: 59.0,
        totalPrice: 118.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "geolier-napoli-2026-06-28": {
    eventTitle: "Geolier - Stadi 2026",
    artist: "Geolier",
    artistSlug: "geolier",
    dayName: "domenica",
    date: "28/06/2026",
    time: "21.00",
    venue: "Stadio Diego Armando Maradona",
    city: "NAPOLI",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo (CAMBIO NOMINATIVO) a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: [
      {
        id: "geolier-prato-jun28",
        quantity: 3,
        section: "Prato",
        price: 59.0,
        totalPrice: 177.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "geolier-napoli-2026-06-07": {
    eventTitle: "Geolier - 2026 Stage",
    artist: "Geolier",
    artistSlug: "geolier",
    dayName: "domenica",
    date: "07/06/2026",
    time: "21.00",
    venue: "Stadio Maradona",
    city: "NAPOLI",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Curva A",
        price: 65.0,
        totalPrice: 65.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Tribuna Posillipo",
        row: "Fila 9",
        price: 68.0,
        totalPrice: 136.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Prato",
        price: 62.0,
        totalPrice: 62.0,
        verified: true,
        fairDeal: false,
      },
      {
        id: "t4",
        quantity: 4,
        section: "Curva B",
        price: 65.0,
        totalPrice: 260.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "geolier-milano-2026-06-14": {
    eventTitle: "Geolier - 2026 Stage",
    artist: "Geolier",
    artistSlug: "geolier",
    dayName: "domenica",
    date: "14/06/2026",
    time: "21.00",
    venue: "Stadio San Siro",
    city: "MILANO",
    color: "from-zinc-900 to-zinc-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 marzo 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 marzo 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 marzo 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Secondo Anello Verde",
        price: 68.0,
        totalPrice: 68.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Prato",
        price: 65.0,
        totalPrice: 130.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Primo Anello Arancio",
        row: "Fila 5",
        seat: "Posto 28",
        price: 72.0,
        totalPrice: 72.0,
        verified: true,
        fairDeal: false,
      },
      {
        id: "t4",
        quantity: 3,
        section: "Secondo Anello Rosso",
        price: 68.0,
        totalPrice: 204.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "ultimo-roma-2026-07-04": {
    eventTitle: "Ultimo - La Favola per Sempre",
    artist: "Ultimo",
    artistSlug: "ultimo",
    dayName: "sabato",
    date: "04/07/2026",
    time: "20.30",
    venue: "Tor Vergata",
    city: "ROMA",
    color: "from-red-900 to-red-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 4 maggio 2026 fino a 48h prima dell'evento. Per una panoramica su settori e prezzi, consulta la mappa",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 4 maggio 2026 fino a 48h prima dell'evento. Sarà possibile effettuare un solo cambio nominativo al link dedicato www.ticketone.it/cambionomeultimo2026",
    deliveryInfo:
      "Come stabilito dall'organizzatore, la consegna dei biglietti (tramite Corriere Espresso, Stampa@Casa o eTicket) verrà effettuata a partire dal 4 maggio 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Posto Unico",
        price: 77.28,
        totalPrice: 77.28,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Posto Unico",
        price: 90.16,
        totalPrice: 180.32,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Settore A",
        row: "Fila 5",
        seat: "Posto 12",
        price: 82.0,
        totalPrice: 82.0,
        verified: true,
        fairDeal: false,
      },
      {
        id: "t4",
        quantity: 3,
        section: "Settore B",
        price: 77.28,
        totalPrice: 231.84,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "vasco-rossi-napoli-2026-06-20": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    dayName: "sabato",
    date: "20/06/2026",
    time: "21.00",
    venue: "Stadio Maradona",
    city: "NAPOLI",
    color: "from-blue-900 to-blue-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Curva Sud",
        price: 79.0,
        totalPrice: 79.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Tribuna Laterale",
        row: "Fila 8",
        price: 82.0,
        totalPrice: 164.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Prato",
        price: 75.0,
        totalPrice: 75.0,
        verified: true,
        fairDeal: false,
      },
    ],
  },
  "vasco-rossi-milano-2026-06-13": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    dayName: "sabato",
    date: "13/06/2026",
    time: "21.00",
    venue: "Stadio San Siro",
    city: "MILANO",
    color: "from-blue-900 to-blue-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Secondo Anello Verde",
        price: 94.0,
        totalPrice: 94.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Primo Anello Arancio",
        row: "Fila 12",
        price: 98.0,
        totalPrice: 196.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 3,
        section: "Prato",
        price: 90.0,
        totalPrice: 270.0,
        verified: true,
        fairDeal: false,
      },
      {
        id: "t4",
        quantity: 1,
        section: "Tribuna Numerata",
        row: "Fila 3",
        seat: "Posto 22",
        price: 105.0,
        totalPrice: 105.0,
        verified: true,
        fairDeal: true,
      },
    ],
  },
  "vasco-rossi-bologna-2026-06-27": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    dayName: "sabato",
    date: "27/06/2026",
    time: "21.00",
    venue: "Stadio Dall'Ara",
    city: "BOLOGNA",
    color: "from-blue-900 to-blue-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Curva Andrea Costa",
        price: 82.0,
        totalPrice: 82.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Tribuna Centrale",
        row: "Fila 6",
        price: 85.0,
        totalPrice: 170.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Prato",
        price: 78.0,
        totalPrice: 78.0,
        verified: true,
        fairDeal: false,
      },
    ],
  },
  "vasco-rossi-roma-2026-06-06": {
    eventTitle: "Vasco Live 2026",
    artist: "Vasco Rossi",
    artistSlug: "vasco-rossi",
    dayName: "sabato",
    date: "06/06/2026",
    time: "21.00",
    venue: "Stadio Olimpico",
    city: "ROMA",
    color: "from-blue-900 to-blue-700",
    resaleInfo:
      "Per questo evento sarà consentito eseguire la procedura di rivendita su fanSALE.it a partire dal 1 aprile 2026 fino a 48h prima dell'evento.",
    nameChangeInfo:
      "Per questo evento sarà consentito eseguire la procedura di cambio nominativo a partire dalle ore 10 del 1 aprile 2026 fino a 48h prima dell'evento.",
    deliveryInfo:
      "La consegna dei biglietti verrà effettuata tramite eTicket a partire dal 1 aprile 2026.",
    tickets: [
      {
        id: "t1",
        quantity: 1,
        section: "Curva Nord",
        price: 89.5,
        totalPrice: 89.5,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t2",
        quantity: 2,
        section: "Tribuna",
        row: "Fila 10",
        price: 94.0,
        totalPrice: 188.0,
        verified: true,
        fairDeal: true,
      },
      {
        id: "t3",
        quantity: 1,
        section: "Prato",
        price: 79.0,
        totalPrice: 79.0,
        verified: true,
        fairDeal: false,
      },
    ],
  },
};

function getEventData(slug: string) {
  if (EVENT_TICKETS[slug]) return EVENT_TICKETS[slug];
  // Fallback for unknown slugs
  return null;
}

function TicketsContent() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "";
  const event = getEventData(slug);
  const [sortBy, setSortBy] = useState<"price" | "quantity">("price");

  // Redirect to new numeric URL
  useEffect(() => {
    // Import inline to avoid circular deps — use the EVENT_TICKETS data we already have
    if (event) {
      // Find the matching MOCK_EVENT_TICKETS entry to get numericId
      import("@/lib/mockTickets").then(({ MOCK_EVENT_TICKETS }) => {
        const mockEvent = MOCK_EVENT_TICKETS[slug];
        if (mockEvent) {
          router.replace(
            `/tickets/all/${mockEvent.artistSlug}/${mockEvent.artistId}/${mockEvent.numericId}`,
          );
        }
      });
    }
  }, [slug, event, router]);

  if (!event) {
    return (
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500 font-medium">Evento non trovato</p>
          <Link
            href="/cerca"
            className="text-[#1a2744] hover:underline text-sm mt-2 block"
          >
            ← Torna alla ricerca
          </Link>
        </div>
      </main>
    );
  }

  const sortedTickets = [...event.tickets].sort((a, b) =>
    sortBy === "price" ? a.price - b.price : a.quantity - b.quantity,
  );

  return (
    <main className="flex-1 bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center gap-1 text-sm text-[#1a2744] flex-wrap">
          <Link href="/" className="hover:underline">
            fanSALE
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/cerca?category=Concerti" className="hover:underline">
            Concerti
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/cerca?category=Pop+Rock" className="hover:underline">
            Pop & Rock
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link
            href={`/evento/${event.artistSlug}`}
            className="hover:underline"
          >
            {event.artist}
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link
            href={`/evento/${event.artistSlug}`}
            className="hover:underline"
          >
            {event.eventTitle}
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-600">
            {event.city}, {event.dayName} {event.date}
          </span>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto text-sm text-gray-600">
          fanSALE è un mercato secondario di rivendita di biglietti, dove il
          prezzo dei biglietti è sempre uguale al prezzo originale.
        </div>
      </div>

      {/* Artist + event banner */}
      <div className={`bg-gradient-to-r ${event.color}`}>
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-6">
          <div className="w-28 h-28 rounded border-2 border-white/30 overflow-hidden shrink-0 relative bg-black/30">
            <Image
              src={getArtistImage(event.artist)}
              alt={event.artist}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">{event.artist}</h1>
            <p className="text-white/80 mt-1 flex items-center gap-2 text-sm">
              <Clock size={14} /> {event.dayName}, {event.date} {event.time}
              <span className="mx-1">·</span>
              <MapPin size={14} /> {event.venue}, {event.city}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-4">
        {/* Back link */}
        <Link
          href={`/evento/${event.artistSlug}`}
          className="flex items-center gap-1 text-[#1a2744] text-sm hover:underline"
        >
          <ChevronLeft size={16} /> Torna alle date
        </Link>

        {/* Yellow resale info banner */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-sm text-gray-800 space-y-2">
          <p>
            <strong>RIVENDITA:</strong> {event.resaleInfo}
          </p>
          <p>
            <strong>CAMBIO NOMINATIVO:</strong> {event.nameChangeInfo}
          </p>
          <p>
            <strong>CONSEGNA BIGLIETTI:</strong> {event.deliveryInfo}
          </p>
        </div>

        {/* Tickets table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-3 sm:px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Biglietti</h2>
            <div className="flex gap-1.5">
              <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal size={12} /> Filtri
              </button>
              <button
                onClick={() =>
                  setSortBy(sortBy === "price" ? "quantity" : "price")
                }
                className="flex items-center gap-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowUpDown size={12} /> Ordina
              </button>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-3 sm:px-5 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Qtà</span>
            <span>Settore / Posto</span>
            <span className="text-right">Ordine</span>
            <span className="w-5" />
          </div>

          <div className="flex">
            {/* Ticket rows */}
            <div className="flex-1 divide-y divide-gray-100">
              {sortedTickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/biglietto/${ticket.id}?event=${slug}`}
                  className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-3 sm:px-5 py-3 hover:bg-gray-50 transition-colors group"
                >
                  {/* Quantity */}
                  <div className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center font-bold text-sm text-gray-800 shrink-0">
                    {ticket.quantity}
                  </div>

                  {/* Section info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-semibold text-sm text-gray-800 truncate">
                        {ticket.section}
                      </span>
                      {ticket.row && (
                        <span className="text-gray-500 text-xs">
                          · {ticket.row}
                        </span>
                      )}
                      {ticket.seat && (
                        <span className="text-gray-500 text-xs">
                          · {ticket.seat}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-gray-700 mt-0.5">
                      Prezzo fisso €{" "}
                      {ticket.totalPrice.toFixed(2).replace(".", ",")}
                    </p>
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center gap-1 shrink-0">
                    {ticket.fairDeal && (
                      <div className="w-7 h-7 rounded-full border-2 border-sky-400 bg-sky-50 flex items-center justify-center">
                        <Handshake size={13} className="text-sky-500" />
                      </div>
                    )}
                    {ticket.verified && (
                      <div className="w-7 h-7 rounded-full border-2 border-green-400 bg-green-50 flex items-center justify-center">
                        <CheckCircle size={13} className="text-green-500" />
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={18}
                    className="text-yellow-500 group-hover:translate-x-1 transition-transform shrink-0"
                  />
                </Link>
              ))}
            </div>

            {/* Right: concert background image — desktop only */}
            <div
              className="hidden lg:block w-56 shrink-0 bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(to right, white, transparent), url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80')`,
              }}
            />
          </div>
        </div>

        {/* Alert offerte */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Alert offerte
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Non hai trovato quello che cercavi? Il nostro Alert Offerte ti
            informa non appena le offerte per l&apos;evento desiderato saranno
            disponibili su fanSALE. Basta impostare i criteri di ricerca e
            riceverai le offerte più adeguate via mail nell&apos;intervallo di
            tempo desiderato.{" "}
            <Link
              href="/login"
              className="text-[#1a2744] hover:underline font-medium"
            >
              Crea il tuo Alert Offerte ▶
            </Link>
          </p>
        </div>

        {/* Vendi biglietti */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Vendi biglietti
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Hai acquistato i biglietti per {event.artist} al {event.dayName},{" "}
            {event.date} {event.time}, {event.venue}, {event.city} ma non riesci
            a partecipare all&apos;evento? Nessun problema: con fanSALE puoi
            vendere in modo semplice, veloce e sicuro i tuoi biglietti
            attraverso il mercato dei biglietti online di TicketOne. In questo
            modo, puoi vendere i tuoi biglietti in maniera legale ai veri fan,
            anche per eventi sold-out.{" "}
            <Link
              href="/sell"
              className="text-[#1a2744] hover:underline font-medium"
            >
              vendere ▶
            </Link>
          </p>
        </div>

        {/* Consigliati */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-bold text-gray-800 mb-2">
            Consigliati da fanSALE
          </p>
          <div className="flex flex-wrap gap-1 text-sm">
            {[
              "Elodie Biglietti",
              "Annalisa Biglietti",
              "Elisa Biglietti",
              "Cesare Cremonini Biglietti",
              "Claudio Baglioni Biglietti",
              "Negramaro Biglietti",
              "Max Pezzali Biglietti",
            ].map((a, i, arr) => (
              <span key={a} className="flex items-center">
                <Link
                  href={`/cerca?q=${encodeURIComponent(a.replace(" Biglietti", ""))}`}
                  className="text-[#1a2744] hover:underline"
                >
                  {a}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-gray-400 mx-1">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function EventTicketsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-40 bg-gray-300 rounded" />
              <div className="h-48 bg-white rounded border border-gray-200" />
            </div>
          </main>
        }
      >
        <TicketsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
