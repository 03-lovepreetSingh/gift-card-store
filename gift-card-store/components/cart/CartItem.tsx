'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { Minus, Plus, Trash2 } from 'lucide-react'
interface CartItemProps {
  id: string
  brand: string
  name: string
  price: number
  discountPercentage: number
  quantity: number
  image: string
  index?: number
}
export function CartItem({
  id,
  brand,
  name,
  price,
  discountPercentage,
  quantity,
  image,
  index = 0,
}: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const discountedPrice = price - price * (discountPercentage / 100)
  const totalPrice = discountedPrice * quantity
  const handleIncrement = () => {
    updateQuantity(id, quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1)
    }
  }
  const handleRemove = () => {
    removeItem(id)
  }
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.2,
        },
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      className="flex items-center space-x-4 py-4 border-b border-border last:border-0"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        className="h-16 w-16 bg-muted rounded-md overflow-hidden flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={brand}
            fill
            className="object-contain"
            sizes="(max-width: 64px) 100vw"
          />
        </div>
      </motion.div>
      <div className="flex-1 min-w-0">
        <Link href={`/shop/${id}`} className="block">
          <h3 className="font-medium truncate">{brand}</h3>
        </Link>
        <p className="text-sm text-muted-foreground truncate">{name}</p>
        <div className="flex items-center mt-1">
          <span className="font-medium">${discountedPrice.toFixed(2)}</span>
          {discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through ml-2">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="p-1 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50"
        >
          <Minus className="h-4 w-4" />
        </motion.button>
        <motion.span
          key={quantity} // Add key to trigger animation on quantity change
          initial={{
            scale: 1.2,
            opacity: 0.7,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          className="w-8 text-center"
        >
          {quantity}
        </motion.span>
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={handleIncrement}
          className="p-1 rounded-md bg-muted hover:bg-muted/80"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>
      <div className="text-right">
        <motion.div
          key={totalPrice} // Add key to trigger animation on price change
          initial={{
            scale: 1.1,
          }}
          animate={{
            scale: 1,
          }}
          className="font-medium"
        >
          ${totalPrice.toFixed(2)}
        </motion.div>
        <motion.button
          whileHover={{
            scale: 1.05,
            color: '#ef4444',
          }}
          onClick={handleRemove}
          className="text-sm text-muted-foreground hover:text-destructive mt-1 flex items-center"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Remove
        </motion.button>
      </div>
    </motion.div>
  )
}
