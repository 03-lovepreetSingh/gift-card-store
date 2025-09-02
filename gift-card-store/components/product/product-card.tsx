'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star } from 'lucide-react'
import { GiftCard } from '@/lib/mockData'

interface ProductCardProps {
  giftCard: GiftCard
  onAddToCart?: (giftCard: GiftCard) => void
}

export function ProductCard({ giftCard, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={giftCard.image}
          alt={giftCard.brand}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {giftCard.isPopular && (
          <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
        {!giftCard.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{giftCard.brand}</h3>
            <Badge variant="outline">{giftCard.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {giftCard.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">${giftCard.denomination}</span>
              <div className="text-sm text-muted-foreground">
                {giftCard.cryptoPrice}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/shop/${giftCard.id}`}>View Details</Link>
        </Button>
        <Button 
          onClick={() => onAddToCart?.(giftCard)}
          disabled={!giftCard.inStock}
          size="icon"
          className="shrink-0"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}