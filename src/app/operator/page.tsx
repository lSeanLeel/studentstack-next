import { OperatorStudio } from "@/components/operator/OperatorStudio";

export const metadata = {
  title: "Operator · StudentStack Daily",
  description: "Internal newsletter studio for StudentStack Daily.",
  robots: { index: false, follow: false },
};

export default function OperatorPage() {
  return <OperatorStudio />;
}
