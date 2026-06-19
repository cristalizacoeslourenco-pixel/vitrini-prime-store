import { PolicyPage } from "@/components/ui/PolicyPage";
import { returnPolicy } from "@/data/legalTexts";

export const metadata = { title: "Trocas e Devoluções | Vitrini Prime" };

export default function ReturnPolicyPage() {
  return <PolicyPage doc={returnPolicy} />;
}
