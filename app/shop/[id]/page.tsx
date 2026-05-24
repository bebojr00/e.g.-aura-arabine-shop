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
    return { title: "منتج غير موجود | أورا عربين" };
  }

  return {
    title: `${product.name} — ${product.brand} | أورا عربين`,
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
