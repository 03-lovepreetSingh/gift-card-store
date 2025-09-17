import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { GiftCard } from '../../data/types'
import { useCart } from '@/context/CartContext'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../Button'
interface ProductCardProps {
  card: GiftCard
  index?: number
}
export function ProductCard({ card, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const discountedPrice =
    card.price - card.price * (card.discountPercentage / 100)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(card)
    toast.success(`${card.name} added to cart!`)
  }
  return (
    <motion.div
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
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 300,
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}
      
      className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={`/shop/${card.id}`} className="block h-full">
        <div className="relative h-40 bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center p-4">
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0.8,
            }}
            className="relative w-full h-full"
          >
            <Image
              src={card.image}
              alt={card.brand}
              fill
              className="object-contain"
              priority={index < 3}
            />
          </motion.div>
          {card.discountPercentage > 0 && (
            <motion.div
              initial={{
                x: 20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
                duration: 0.3,
              }}
              className="absolute top-2 right-2 bg-[#ff7e5f] text-white text-xs font-bold px-2 py-1 rounded-sm"
            >
              {card.discountPercentage}% OFF
            </motion.div>
          )}
        </div>
        <div className="p-3">
          <div className="flex flex-col mb-2">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              {card.category}
            </div>
            <h3 className="font-semibold text-base">{card.brand}</h3>
            <h4 className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {card.name}
            </h4>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-base">
                ${discountedPrice.toFixed(2)}
              </span>
              {card.discountPercentage > 0 && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400 line-through">
                  ${card.price.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="sm"
              leftIcon={<ShoppingCart className="h-4 w-4" />}
              className="border-[#ff7e5f] text-[#ff7e5f] hover:bg-[#ff7e5f] hover:text-white"
            >
              Add
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
