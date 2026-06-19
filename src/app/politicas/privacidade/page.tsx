import { PolicyPage } from "@/components/ui/PolicyPage";
import { privacyPolicy } from "@/data/legalTexts";

export const metadata = { title: "Política de Privacidade | Vitrini Prime" };

export default function PrivacyPage() {
  return <PolicyPage doc={privacyPolicy} />;
}
