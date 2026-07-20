"use client";

import { useActionState } from "react";
import type { ArtistFormState } from "@/app/admin/(protected)/nghe-si/actions";
import type { Artist } from "@/lib/content/artist";

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt";
const labelClass = "text-sm text-text-muted";

export function ArtistForm({
  action,
  artist,
}: {
  action: (prevState: ArtistFormState, formData: FormData) => Promise<ArtistFormState>;
  artist: Artist;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="name">
          Tên nghệ sĩ *
        </label>
        <input id="name" name="name" required defaultValue={artist.name} className={fieldClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="bioVi">
            Tiểu sử (VI)
          </label>
          <textarea id="bioVi" name="bioVi" rows={5} defaultValue={artist.bioVi ?? ""} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="bioEn">
            Tiểu sử (EN)
          </label>
          <textarea id="bioEn" name="bioEn" rows={5} defaultValue={artist.bioEn ?? ""} className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="statementVi">
            Tuyên ngôn nghệ thuật (VI)
          </label>
          <textarea
            id="statementVi"
            name="statementVi"
            rows={5}
            defaultValue={artist.statementVi ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="statementEn">
            Tuyên ngôn nghệ thuật (EN)
          </label>
          <textarea
            id="statementEn"
            name="statementEn"
            rows={5}
            defaultValue={artist.statementEn ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="journeyVi">
            Hành trình sáng tác (VI)
          </label>
          <textarea
            id="journeyVi"
            name="journeyVi"
            rows={5}
            defaultValue={artist.journeyVi ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="journeyEn">
            Hành trình sáng tác (EN)
          </label>
          <textarea
            id="journeyEn"
            name="journeyEn"
            rows={5}
            defaultValue={artist.journeyEn ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {artist.portraitUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={artist.portraitUrl} alt="Chân dung hiện tại" className="h-32 w-32 border border-white/10 object-cover" />
        )}
        <label className={labelClass} htmlFor="portrait">
          Ảnh chân dung (chọn để thay, không bắt buộc)
        </label>
        <input id="portrait" name="portrait" type="file" accept="image/*" />
      </div>

      {state?.error && (
        <p role="alert" className="border border-accent-oxblood px-4 py-3 text-sm text-accent-oxblood">
          {state.error}
        </p>
      )}
      {state?.ok && <p className="text-sm text-accent-cobalt">Đã lưu thông tin nghệ sĩ.</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit border border-accent-cobalt px-6 py-3 text-sm text-text transition-colors hover:bg-accent-cobalt disabled:opacity-50"
      >
        {pending ? "Đang lưu…" : "Lưu"}
      </button>
    </form>
  );
}
