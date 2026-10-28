import { CompanyPage, companyMeta } from "@/components/catalog/company-page";

export const metadata = companyMeta("faq");

export default function Page() {
  return <CompanyPage slug="faq" />;
}
