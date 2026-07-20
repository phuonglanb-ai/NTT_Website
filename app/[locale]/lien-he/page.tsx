import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-serif text-3xl">{t("title")}</h1>
      <p className="mt-3 text-text-muted">{t("intro")}</p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}
