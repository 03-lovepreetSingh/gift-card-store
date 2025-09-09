// API Response Types
export interface ApiGiftCard {
  id: string
  status: "ACTIVE" | "INACTIVE"
  title: string
  brandDescription: string | null
  category: string[]
  tags: string[]
  denominationType: "FIXED" | "VARIABLE"
  cardType: string
  redemptionType: "ONLINE" | "OFFLINE" | "BOTH"
  amountRestrictions: {
    minAmount: number
    maxAmount: number
    minOrderAmount: number
    maxOrderAmount: number
    minVoucherAmount: number
    maxVoucherAmount: number
    maxVouchersPerOrder: number
    maxVouchersPerDenomination: number | null
    maxDenominationsPerOrder: number | null
    denominations: number[]
  }
  iconImageUrl: string
  thumbnailUrl: string
  logoUrl: string
  tncUrl: string
  termsAndConditions: string[]
  usageInstructions: {
    [key: string]: string[]
  }
  howToUseInstructions: Array<{
    retailMode: string
    retailModeName: string
    instructions: string[]
  }>
  canBalanceBeFetched: boolean
  voucherExpiryInMonths: number | null
  variantDetails: any[]
  discountPercentage: number | null
}

export interface ApiResponse {
  nextCursor: string | null
  data: ApiGiftCard[]
}

// Component Types (transformed from API)
export interface GiftCard {
  id: string
  brand: string
  description: string
  price: number
  denomination: number
  category: string
  image: string
  isPopular: boolean
  inStock: boolean
  cryptoPrice: string
  discountPercentage?: number
  termsAndConditions: string[]
  usageInstructions: string[]
  availableDenominations: number[]
}
