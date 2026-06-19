import { PolicyPage } from "@/components/ui/PolicyPage";
import { shippingPolicy } from "@/data/legalTexts";

export const metadata = { title: "Frete e Entrega | Vitrini Prime" };

export default function ShippingPolicyPage() {
  return <PolicyPage doc={shippingPolicy} />;
}
