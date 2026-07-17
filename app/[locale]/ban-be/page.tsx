import { getTranslations } from "next-intl/server";
import { PlaceholderSection } from "@/components/ui/placeholder-section";

export default async function FriendsPage() {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("placeholderPage");

  return <PlaceholderSection title={tNav("friends")} note={t("comingSoon")} />;
}
