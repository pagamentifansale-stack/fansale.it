export function generateSlug(artist: string, city: string, date: string): string {
  const artistSlug = artist.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const citySlug = city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const year = new Date(date).getFullYear()
  return `${artistSlug}-${citySlug}-${year}`
}
