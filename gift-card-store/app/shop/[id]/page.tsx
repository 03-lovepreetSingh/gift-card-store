// app/shop/[id]/page.tsx
import { notFound } from "next/navigation";
import { mockGiftCards } from "@/lib/mockData";
import ProductPageClient from "./product-page-client";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const giftCard = mockGiftCards.find((card) => card.id === params.id);

  if (!giftCard) {
    notFound();
  }

  return <ProductPageClient giftCard={giftCard} allCards={mockGiftCards} />;
}

export async function generateStaticParams() {
  return mockGiftCards.map((card) => ({
    id: card.id,
  }));
}
