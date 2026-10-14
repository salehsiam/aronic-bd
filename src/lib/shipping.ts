export const DELIVERY_CHARGES = {
  dhaka: 80,
  outside: 130,
} as const

export type DeliveryArea = keyof typeof DELIVERY_CHARGES