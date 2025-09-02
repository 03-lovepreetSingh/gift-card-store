export interface GiftCard {
  id: string;
  brand: string;
  category: string;
  denomination: number;
  price: number;
  cryptoPrice: string;
  image: string;
  description: string;
  isPopular?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  giftCard: GiftCard;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  cryptoTotal: string;
  status: "pending" | "paid" | "fulfilled" | "failed";
  txHash?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  walletAddress?: string;
  createdAt: string;
}

export const mockGiftCards: GiftCard[] = [
  {
    id: "1",
    brand: "Amazon",
    category: "Shopping",
    denomination: 50,
    price: 50,
    cryptoPrice: "0.031 ETH",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Amazon gift card - perfect for online shopping",
    isPopular: true,
    inStock: true,
  },
  {
    id: "2",
    brand: "Apple",
    category: "Technology",
    denomination: 100,
    price: 100,
    cryptoPrice: "0.062 ETH",
    image:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Apple Store gift card for apps, games, and more",
    isPopular: true,
    inStock: true,
  },
  {
    id: "3",
    brand: "Netflix",
    category: "Entertainment",
    denomination: 25,
    price: 25,
    cryptoPrice: "0.015 ETH",
    image:
      "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Stream your favorite shows and movies",
    inStock: true,
  },
  {
    id: "4",
    brand: "Spotify",
    category: "Entertainment",
    denomination: 30,
    price: 30,
    cryptoPrice: "0.018 ETH",
    image:
      "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Premium music streaming service",
    inStock: true,
  },
  {
    id: "5",
    brand: "Steam",
    category: "Gaming",
    denomination: 75,
    price: 75,
    cryptoPrice: "0.047 ETH",
    image:
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Gaming platform gift card for PC games",
    inStock: true,
  },
  {
    id: "6",
    brand: "Starbucks",
    category: "Food & Drink",
    denomination: 20,
    price: 20,
    cryptoPrice: "0.012 ETH",
    image:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Coffee and beverages gift card",
    inStock: false,
  },
];

export const mockCartItems: CartItem[] = [
  {
    id: "1",
    giftCard: mockGiftCards[0],
    quantity: 2,
  },
  {
    id: "2",
    giftCard: mockGiftCards[1],
    quantity: 1,
  },
];

export const mockOrders: Order[] = [
  {
    id: "order-1",
    date: "2024-01-15",
    items: [
      { id: "1", giftCard: mockGiftCards[0], quantity: 1 },
      { id: "2", giftCard: mockGiftCards[1], quantity: 1 },
    ],
    total: 150,
    cryptoTotal: "0.093 ETH",
    status: "fulfilled",
    txHash: "0x1234...5678",
  },
  {
    id: "order-2",
    date: "2024-01-10",
    items: [{ id: "3", giftCard: mockGiftCards[2], quantity: 2 }],
    total: 50,
    cryptoTotal: "0.030 ETH",
    status: "paid",
    txHash: "0xabcd...efgh",
  },
  {
    id: "order-3",
    date: "2024-01-05",
    items: [{ id: "4", giftCard: mockGiftCards[3], quantity: 1 }],
    total: 30,
    cryptoTotal: "0.018 ETH",
    status: "pending",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    walletAddress: "0x1234...5678",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    email: "jane@example.com",
    name: "Jane Smith",
    walletAddress: "0xabcd...efgh",
    createdAt: "2024-01-05",
  },
];

export const mockAnalytics = {
  totalSales: 125000,
  totalOrders: 1250,
  activeUsers: 850,
  conversionRate: 3.2,
  monthlyData: [
    { month: "Jan", sales: 12000, orders: 120 },
    { month: "Feb", sales: 15000, orders: 150 },
    { month: "Mar", sales: 18000, orders: 180 },
    { month: "Apr", sales: 22000, orders: 220 },
    { month: "May", sales: 25000, orders: 250 },
    { month: "Jun", sales: 33000, orders: 330 },
  ],
};

export const categories = [
  "All",
  "Shopping",
  "Technology",
  "Entertainment",
  "Gaming",
  "Food & Drink",
];
export const brands = [
  "All",
  "Amazon",
  "Apple",
  "Netflix",
  "Spotify",
  "Steam",
  "Starbucks",
];
