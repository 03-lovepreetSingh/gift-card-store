export type GiftCard = {
    id: string
    brand: string
    name: string
    description: string
    price: number
    discountPercentage: number
    category: string
    image: string
    featured: boolean
    trending: boolean
  }
  export type Order = {
    id: string
    userId: string
    items: {
      cardId: string
      quantity: number
      price: number
    }[]
    totalAmount: number
    status: 'pending' | 'paid' | 'fulfilled'
    createdAt: string
    paymentMethod: 'crypto' | 'card'
    transactionHash?: string
  }
  export type User = {
    id: string
    name: string
    email: string
    walletAddress?: string
    createdAt: string
  }
  