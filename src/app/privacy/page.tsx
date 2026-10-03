import type { Metadata } from "next";
import { privacyPolicyHtml } from "@/content/privacy-policy";

const description = "What the FayaPay app for Android reads, what stays on your phone, and what leaves it.";

export const metadata: Metadata = {
  title: "Privacy policy · FayaPay",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy policy · FayaPay", description, url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="shell py-14 sm:py-20">
      <div className="policy mx-auto max-w-[44rem]" dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }} />
    </article>
  );
}
