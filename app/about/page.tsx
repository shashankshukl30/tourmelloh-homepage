import { CompanyPage, companyMeta } from "@/components/catalog/company-page";

export const metadata = companyMeta("about");

export default function Page() {
  return <CompanyPage slug="about" />;
}
