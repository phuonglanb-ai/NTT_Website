import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPublishedFriends } from "@/lib/content/friends";
import { Paragraphs } from "@/components/ui/paragraphs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("friendsPage");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function FriendsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, friends] = await Promise.all([
    getTranslations("friendsPage"),
    getPublishedFriends(),
  ]);
  const isEn = locale === "en";

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-3xl uppercase tracking-[0.14em]">{t("title")}</h1>
      <Paragraphs text={t("intro")} className="mt-6 text-text-muted" />

      {/* Mien tru trach nhiem: bai cua ban huu la contributor voice, khong phai
          phat ngon cua nghe si (CLAUDE.md muc 7). */}
      <p className="mt-8 border-l-2 border-white/20 pl-4 text-sm leading-[1.6] text-text-muted">
        {t("disclaimer")}
      </p>

      {friends.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          {t("empty")}
        </p>
      ) : (
        <div className="mt-12 flex flex-col gap-16">
          {friends.map((friend) => {
            const roleNote = isEn ? friend.roleNoteEn : friend.roleNoteVi;
            const bio = isEn ? friend.bioEn : friend.bioVi;
            return (
              <article key={friend.id} className="border-b border-white/10 pb-12">
                <header className="flex items-center gap-4">
                  {friend.avatarUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={friend.avatarUrl}
                      alt={friend.name}
                      className="h-16 w-16 flex-none border border-white/10 object-cover"
                    />
                  )}
                  <div>
                    <h2 className="font-serif text-2xl">{friend.name}</h2>
                    {roleNote && <p className="text-sm text-text-muted">{roleNote}</p>}
                  </div>
                </header>

                {bio && <p className="mt-4 whitespace-pre-wrap text-text">{bio}</p>}

                {friend.contributions.length > 0 && (
                  <div className="mt-6 flex flex-col gap-6">
                    {friend.contributions.map((c) => (
                      <div key={c.id} className="border-l-2 border-accent-cobalt pl-4">
                        <h3 className="font-serif text-lg">{isEn ? c.titleEn : c.titleVi}</h3>
                        {/* Ten tac gia hien ngay duoi tieu de -- moi bai deu
                            phai truy duoc ve nguoi viet. */}
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
                          {friend.name}
                        </p>
                        {(isEn ? c.bodyEn : c.bodyVi) && (
                          <p className="mt-2 whitespace-pre-wrap text-text-muted">
                            {isEn ? c.bodyEn : c.bodyVi}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
