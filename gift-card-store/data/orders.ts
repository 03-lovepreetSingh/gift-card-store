import { Order } from './types'
export const orders: Order[] = [
  {
    id: 'order1',
    userId: '1',
    items: [
      {
        cardId: '1',
        quantity: 2,
        price: 50,
      },
      {
        cardId: '3',
        quantity: 1,
        price: 30,
      },
    ],
    totalAmount: 130,
    status: 'fulfilled',
    createdAt: '2023-10-15T10:30:00Z',
    paymentMethod: 'crypto',
    transactionHash: '0x123abc456def789ghi',
  },
  {
    id: 'order2',
    userId: '1',
    items: [
      {
        cardId: '4',
        quantity: 1,
        price: 100,
      },
    ],
    totalAmount: 100,
    status: 'paid',
    createdAt: '2023-11-05T14:20:00Z',
    paymentMethod: 'crypto',
    transactionHash: '0x789ghi123abc456def',
  },
  {
    id: 'order3',
    userId: '1',
    items: [
      {
        cardId: '6',
        quantity: 1,
        price: 40,
      },
      {
        cardId: '5',
        quantity: 2,
        price: 20,
      },
    ],
    totalAmount: 80,
    status: 'pending',
    createdAt: '2023-11-20T09:15:00Z',
    paymentMethod: 'crypto',
  },
]
