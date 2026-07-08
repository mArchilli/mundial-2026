export const PACKS = [
  { id: '2x20', label: '2x20', price: 85000, priceText: 'AR$85.000', tag: 'Disponible ahora', recommended: true },
  { id: '3x30', label: '3x30', price: 100000, priceText: 'AR$100.000', tag: 'Disponible ahora' },
  { id: '4x30', label: '4x30', price: 115000, priceText: 'AR$115.000', tag: 'Disponible ahora' },
]

export const DEFAULT_PACK_ID = '2x20'

export function getPackById(packId) {
  return PACKS.find((pack) => pack.id === packId) ?? PACKS[0]
}
