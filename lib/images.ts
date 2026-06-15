// Central image registry for all artists and events
// Uses Unsplash free concert/music photos as placeholders
// Replace with real artist photos once you have them

export const ARTIST_IMAGES: Record<string, string> = {
  'Bad Bunny': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
  'Vasco Rossi': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  'Ultimo': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
  'Annalisa': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80',
  'Elodie': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  'Geolier': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  'Luchè': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
  'Caparezza': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
  'Zucchero': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
  'Fabrizio Moro': 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80',
  'Luca Carboni': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
  'Cesare Cremonini': 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80',
  'Negramaro': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
  'Max Pezzali': 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=400&q=80',
  'Elisa': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80',
  'Claudio Baglioni': 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80',
  'Deep Purple': 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
  'Ghemon': 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80',
  'Tropico': 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80',
}

export const EVENT_IMAGES: Record<string, string> = {
  'Bad Bunny': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  'Vasco Rossi': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  'Ultimo': 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
  'Annalisa': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  'Elodie': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  'Geolier': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  'Luchè': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  'Caparezza': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  'Zucchero': 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80',
  'Fabrizio Moro': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
  'Luca Carboni': 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80',
  'Cesare Cremonini': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  'Negramaro': 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=800&q=80',
  'Max Pezzali': 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
  'Elisa': 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80',
  'Claudio Baglioni': 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
  'Deep Purple': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  'Ghemon': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
  'Tropico': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
}

export const CONCERT_BG = 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80'

export function getArtistImage(artist: string): string {
  return ARTIST_IMAGES[artist] || DEFAULT_IMAGE
}

export function getEventImage(artist: string): string {
  return EVENT_IMAGES[artist] || DEFAULT_IMAGE
}
