export const PACKS = [
  { id: '2x20', label: '2x20', price: 199999, priceText: 'AR$199.999', tag: 'Disponible ahora', recommended: true },
  { id: '3x30', label: '3x30', price: 219999, priceText: 'AR$219.999', tag: 'Disponible ahora' },
  { id: '4x30', label: '4x30', price: 239999, priceText: 'AR$239.999', tag: 'Disponible ahora' },
]

export const DEFAULT_PACK_ID = '2x20'

export function getPackById(packId) {
  return PACKS.find((pack) => pack.id === packId) ?? PACKS[0]
}
