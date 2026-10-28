import { CompanyPage, companyMeta } from "@/components/catalog/company-page";

export const metadata = companyMeta("booking-terms");

export default function Page() {
  return <CompanyPage slug="booking-terms" />;
}
