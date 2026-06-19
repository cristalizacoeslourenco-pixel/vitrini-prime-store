import type { Metadata } from "next";
import { DepartmentGrid } from "@/components/home/DepartmentGrid";

export const metadata: Metadata = {
  title: "Departamentos | Vitrini Prime",
};

export default function DepartamentosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-graphite">
        Departamentos
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-text-gray">
        Explore os seis mundos de produtos selecionados da Vitrini Prime.
      </p>

      <div className="mt-8">
        <DepartmentGrid />
      </div>
    </div>
  );
}
