// app/shop/[id]/page.tsx  (Server Component)
import { notFound } from "next/navigation";
import { mockGiftCards } from "@/lib/mockData";
import ProductPageClient from "./product-page-client";

export default function ProductPage({ params }: { params: { id: string } }) {
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
