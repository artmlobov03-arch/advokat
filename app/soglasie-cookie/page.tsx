import type { Metadata } from "next";
import { LegalDocument, type LegalDocumentData } from "../components/LegalDocument";
import legalDocuments from "../data/legal-documents.json";

export const metadata: Metadata = {
  title: "Согласие на использование файлов cookie",
  alternates: { canonical: "/soglasie-cookie" },
  robots: { index: false, follow: true },
};

export default function CookieConsentPage() {
  return <LegalDocument document={legalDocuments.cookies as LegalDocumentData} />;
}
