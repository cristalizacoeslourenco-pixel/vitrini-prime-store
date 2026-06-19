import Link from "next/link";
import { departments } from "@/data/departments";

export function DepartmentGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {departments.map((dept) => (
        <Link
          key={dept.slug}
          href={`/categoria/${dept.slug}`}
          className="group relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl p-5"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} transition-transform duration-300 group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-graphite/10 transition-colors group-hover:bg-graphite/0" />
          <div className="relative z-10">
            <h3 className="font-display text-lg font-semibold text-white drop-shadow-sm">
              {dept.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/85 drop-shadow-sm">
              {dept.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
