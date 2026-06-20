export const PACKS = [
  { id: '2x20', label: '2x20', price: 139999, priceText: 'AR$139.999', tag: 'Disponible ahora', recommended: true },
  { id: '3x30', label: '3x30', price: 159999, priceText: 'AR$159.999', tag: 'Disponible ahora' },
  { id: '4x30', label: '4x30', price: 179999, priceText: 'AR$179.999', tag: 'Disponible ahora' },
]

export const DEFAULT_PACK_ID = '2x20'

export function getPackById(packId) {
  return PACKS.find((pack) => pack.id === packId) ?? PACKS[0]
}
