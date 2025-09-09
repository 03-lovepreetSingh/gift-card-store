import { notFound } from "next/navigation"
import ProductPageClient from "./product-page-client"
import { transformApiDataToGiftCards } from "@/lib/data-transformer"
import type { ApiResponse } from "../../../lib/types"

type ProductPageProps = {
  params: { id: string }
}

async function getGiftCard(id: string) {
  try {
    const response = await fetch(`https://gift-card-store-backend.onrender.com/brand/${id}`, {
      cache: "no-store", // Ensure fresh data
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching gift card:", error)
    return null
  }
}

async function getAllGiftCards() {
  try {
    const response = await fetch("https://gift-card-store-backend.onrender.com/brand/", {
      cache: "no-store",
    })

    if (!response.ok) {
      return []
    }

    const apiData: ApiResponse = await response.json()
    return transformApiDataToGiftCards(apiData)
  } catch (error) {
    console.error("Error fetching all gift cards:", error)
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const [giftCardData, allCards] = await Promise.all([getGiftCard(params.id), getAllGiftCards()])

  if (!giftCardData) {
    notFound()
  }

  const transformedGiftCard = {
    id: giftCardData.id,
    brand: giftCardData.title || "Unknown Brand",
    description: giftCardData.termsAndConditions || "No description available",
    price: giftCardData.amountRestrictions?.denominations?.[0] || 0,
    denomination: giftCardData.amountRestrictions?.denominations?.[0] || 0,
    cryptoPrice: `${((giftCardData.amountRestrictions?.denominations?.[0] || 0) * 0.0003).toFixed(4)} ETH`,
    image: giftCardData.thumbnailUrl || giftCardData.logoUrl || "/gift-card-assortment.png",
    category: giftCardData.category || "General",
    inStock: giftCardData.status === "ACTIVE",
    isPopular: giftCardData.discountPercentage > 0,
    tags: giftCardData.tags || [],
  }

  return <ProductPageClient giftCard={transformedGiftCard} allCards={allCards} />
}

// export async function generateStaticParams() {
//   // This would require fetching all IDs from the API
//   return [];
// }
