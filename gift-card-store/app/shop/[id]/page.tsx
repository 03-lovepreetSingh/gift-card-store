// app/shop/[id]/page.tsx
import { notFound } from "next/navigation";
import { mockGiftCards } from "@/lib/mockData";
import ProductPageClient from "./product-page-client";
type ProductPageProps = {
  params: { id: string };
};
export default function ProductPage({ params }: any) {
  const giftCard = mockGiftCards.find((card) => String(card.id) === params.id);

  if (!giftCard) {
    notFound();
  }

  return <ProductPageClient giftCard={giftCard} allCards={mockGiftCards} />;
}

export async function generateStaticParams() {
  return mockGiftCards.map((card) => ({
    id: String(card.id), // ✅ always return string
  }));
}
