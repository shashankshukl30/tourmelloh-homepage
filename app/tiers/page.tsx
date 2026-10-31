import { CompanyPage, companyMeta } from "@/components/catalog/company-page";

export const metadata = companyMeta("tiers");

export default function Page() {
  return <CompanyPage slug="tiers" />;
}
