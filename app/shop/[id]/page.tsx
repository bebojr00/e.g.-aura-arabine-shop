import { notFound } from "next/navigation";
import ProductDetail from "@/components/shop/product-detail";
import { products, getProductById } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Product Not Found | Aura Arabine" };
  }

  return {
    title: `${product.name} — ${product.brand} | Aura Arabine`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
