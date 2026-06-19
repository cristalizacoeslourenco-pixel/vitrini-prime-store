import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { DepartmentGrid } from "@/components/home/DepartmentGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HomeSection } from "@/components/home/HomeSection";
import { FAQ } from "@/components/home/FAQ";
import { getFeaturedProducts } from "@/lib/products";

export default async function Home() {
  const [
    featured,
    musicProducts,
    techProducts,
    homeProducts,
    beautyBarbearia,
    beautyManicure,
    beautySalao,
  ] = await Promise.all([
    getFeaturedProducts(8),
    getFeaturedProducts(4, "musica-instrumentos"),
    getFeaturedProducts(4, "informatica-tecnologia"),
    getFeaturedProducts(4, "casa-utilidades"),
    getFeaturedProducts(2, "barbearia"),
    getFeaturedProducts(2, "manicure"),
    getFeaturedProducts(2, "salao-feminino"),
  ]);

  const beautyProducts = [...beautyBarbearia, ...beautyManicure, ...beautySalao];

  return (
    <div>
      <Hero />
      <TrustBar />

      <HomeSection
        eyebrow="Curadoria"
        title="Departamentos"
        description="Seis mundos de produtos selecionados para o seu dia a dia."
        viewAllHref="/departamentos"
      >
        <DepartmentGrid />
      </HomeSection>

      <HomeSection
        eyebrow="Destaques"
        title="Produtos em destaque"
        viewAllHref="/produtos"
      >
        <FeaturedProducts products={featured} />
      </HomeSection>

      <HomeSection
        eyebrow="Música e Instrumentos"
        title="Para músicos, igrejas e estúdios"
        viewAllHref="/categoria/musica-instrumentos"
      >
        <FeaturedProducts products={musicProducts} />
      </HomeSection>

      <HomeSection
        eyebrow="Informática e Tecnologia"
        title="Setup, escritório e rotina digital"
        viewAllHref="/categoria/informatica-tecnologia"
      >
        <FeaturedProducts products={techProducts} />
      </HomeSection>

      <HomeSection
        eyebrow="Casa e Utilidades"
        title="Organização e praticidade para a casa"
        viewAllHref="/categoria/casa-utilidades"
      >
        <FeaturedProducts products={homeProducts} />
      </HomeSection>

      <HomeSection
        eyebrow="Beleza Profissional"
        title="Barbearia, manicure e salão feminino"
        viewAllHref="/departamentos"
      >
        <FeaturedProducts products={beautyProducts} />
      </HomeSection>

      <HomeSection title="Perguntas frequentes">
        <FAQ />
      </HomeSection>
    </div>
  );
}
