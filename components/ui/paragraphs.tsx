/**
 * Tach mot khoi van ban thanh cac doan theo dong trong (\n\n).
 * Dung chung cho noi dung bien tap trong messages/*.json va noi dung dai
 * do Admin nhap (bio, statement, journey...).
 */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    // leading-[1.6] thay cho leading-relaxed (1.625): gian dong hep lai mot
    // chut de cac dong trong cung mot doan doc lien mach hon, khong bi roi rac.
    <div className={`flex flex-col gap-5 leading-[1.6] ${className ?? ""}`}>
      {text
        .split(/\n{2,}/)
        .map((para) => para.trim())
        .filter(Boolean)
        .map((para, i) => (
          <p key={i} className="whitespace-pre-wrap">
            {para}
          </p>
        ))}
    </div>
  );
}
