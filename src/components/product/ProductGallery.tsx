import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductGallery({ departmentSlug }: { departmentSlug?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <ProductImagePlaceholder
        departmentSlug={departmentSlug}
        className="aspect-square w-full rounded-2xl"
      />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <ProductImagePlaceholder
            key={i}
            departmentSlug={departmentSlug}
            className="aspect-square rounded-xl opacity-80"
          />
        ))}
      </div>
    </div>
  );
}
