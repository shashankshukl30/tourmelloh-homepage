import { CompanyPage, companyMeta } from "@/components/catalog/company-page";

export const metadata = companyMeta("terms");

export default function Page() {
  return <CompanyPage slug="terms" />;
}
