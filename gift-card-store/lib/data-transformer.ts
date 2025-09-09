import type { ApiGiftCard, GiftCard } from "./types"

export function transformApiDataToGiftCards(apiData: ApiGiftCard[]): GiftCard[] {
  return apiData.map((item) => {
    // Use the first available denomination as the default price
    const denominations = item.amountRestrictions?.denominations || []
    const defaultDenomination = denominations.length > 0 ? denominations[0] : 0

    // Determine category - use first category or default to 'General'
    const categories = item.category || []
    const category = categories.length > 0 ? categories[0] : "General"

    // Create description from brand description or generate one
    const description = item.brandDescription || `${item.title} gift card - Perfect for shopping and gifting`

    // Determine if popular based on discount or other criteria
    const tags = item.tags || []
    const isPopular = (item.discountPercentage && item.discountPercentage > 0) || tags.includes("popular") || false

    // Check if in stock based on status
    const inStock = item.status === "ACTIVE"

    // Generate crypto price (placeholder - you might want to calculate this)
    const cryptoPrice = `≈ ${(defaultDenomination * 0.000025).toFixed(6)} ETH`

    // Get usage instructions for online redemption
    const usageInstructions =
      item.usageInstructions?.ONLINE ||
      item.howToUseInstructions?.find((inst) => inst.retailMode === "ONLINE")?.instructions ||
      []

    return {
      id: item.id,
      brand: item.title,
      description,
      price: defaultDenomination,
      denomination: defaultDenomination,
      category,
      image: item.thumbnailUrl || item.iconImageUrl,
      isPopular,
      inStock,
      cryptoPrice,
      discountPercentage: item.discountPercentage || undefined,
      termsAndConditions: item.termsAndConditions,
      usageInstructions,
      availableDenominations: denominations,
    }
  })
}

export function getUniqueCategories(giftCards: GiftCard[]): string[] {
  const categories = new Set(giftCards.map((card) => card.category))
  return ["All", ...Array.from(categories)]
}

export function getUniqueBrands(giftCards: GiftCard[]): string[] {
  const brands = new Set(giftCards.map((card) => card.brand))
  return ["All", ...Array.from(brands)]
}
