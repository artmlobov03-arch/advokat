import type { Metadata } from "next";
import { LegalDocument, type LegalDocumentData } from "../components/LegalDocument";
import legalDocuments from "../data/legal-documents.json";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  alternates: { canonical: "/politika" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalDocument document={legalDocuments.privacy as LegalDocumentData} />;
}
