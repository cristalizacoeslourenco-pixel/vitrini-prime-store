import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { departments } from "@/data/departments";

const FALLBACK_GRADIENT = "from-light-gray to-ice";

export function getDepartmentGradient(departmentSlug?: string): string {
  const dept = departments.find((d) => d.slug === departmentSlug);
  return dept?.gradient ?? FALLBACK_GRADIENT;
}

export function ProductImagePlaceholder({
  departmentSlug,
  className,
}: {
  departmentSlug?: string;
  className?: string;
}) {
  const gradient = getDepartmentGradient(departmentSlug);

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <ImageIcon
        className="text-white/40 mix-blend-overlay"
        size={36}
        strokeWidth={1.5}
      />
    </div>
  );
}
