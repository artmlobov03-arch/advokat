import type { Metadata } from "next";
import { LegalDocument, type LegalDocumentData } from "../components/LegalDocument";
import legalDocuments from "../data/legal-documents.json";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  alternates: { canonical: "/soglasie" },
  robots: { index: false, follow: true },
};

export default function ConsentPage() {
  return <LegalDocument document={legalDocuments.personal as LegalDocumentData} />;
}
