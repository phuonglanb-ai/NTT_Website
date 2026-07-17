import { getTranslations } from "next-intl/server";
import { PlaceholderSection } from "@/components/ui/placeholder-section";

export default async function ContactPage() {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("placeholderPage");

  return <PlaceholderSection title={tNav("contact")} note={t("comingSoon")} />;
}
