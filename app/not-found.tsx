import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs tracking-[0.35em] uppercase text-primary mb-4">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-serif font-light text-foreground mb-4">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for does not exist. Explore our collection
        instead.
      </p>
      <Link
        href="/shop"
        className="px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
      >
        Shop perfumes
      </Link>
    </div>
  );
}
