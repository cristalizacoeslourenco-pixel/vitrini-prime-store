import { PolicyPage } from "@/components/ui/PolicyPage";
import { termsOfUse } from "@/data/legalTexts";

export const metadata = { title: "Termos de Uso | Vitrini Prime" };

export default function TermsPage() {
  return <PolicyPage doc={termsOfUse} />;
}
