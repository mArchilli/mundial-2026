const WHATSAPP_NUMBER = '5491127930349'
const WHATSAPP_MESSAGE =
  '¡Hola! ¿Qué tal? Vengo de la web y estoy interesado en obtener la Copa Chisperio Mundial 2026.'

function createWhatsAppUrl(number, message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_BRANCHES = [
  {
    id: 'buenos-aires',
    city: 'Buenos Aires',
    buttonLabel: 'Sucursal Buenos Aires',
    description: '',
    phoneNumber: '5491127930349',
  },
  {
    id: 'cordoba',
    city: 'Córdoba',
    buttonLabel: 'Sucursal Córdoba',
    description: '',
    phoneNumber: '5493516766208',
  },
]

export function getBranchWhatsAppLinks(selectedPack) {
  const selectedPackText = selectedPack
    ? ` Quiero consultar por la selección ${selectedPack.label} - ${selectedPack.priceText}.`
    : ''

  return WHATSAPP_BRANCHES.map((branch) => ({
    ...branch,
    url: createWhatsAppUrl(
      branch.phoneNumber,
      `${WHATSAPP_MESSAGE} Quiero comunicarme con la sucursal de ${branch.city}.${selectedPackText}`,
    ),
  }))
}

export const WHATSAPP_URL = createWhatsAppUrl(WHATSAPP_NUMBER)
