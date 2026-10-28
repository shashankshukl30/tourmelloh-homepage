import { CompanyPage, companyMeta } from "@/components/catalog/company-page";

export const metadata = companyMeta("privacy");

export default function Page() {
  return <CompanyPage slug="privacy" />;
}
