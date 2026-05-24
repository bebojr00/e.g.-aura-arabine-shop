export default function ShopLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center pt-24">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
}
