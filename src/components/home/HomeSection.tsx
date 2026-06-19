import Link from "next/link";
import type { ReactNode } from "react";

export function HomeSection({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "Ver tudo",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-wider text-champagne">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-1 font-display text-2xl font-semibold text-graphite sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-xl text-sm text-text-gray">{description}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-petrol transition-colors hover:text-champagne"
          >
            {viewAllLabel} →
          </Link>
        )}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
