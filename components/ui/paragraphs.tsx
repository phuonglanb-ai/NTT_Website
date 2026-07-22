/**
 * Tach mot khoi van ban thanh cac doan theo dong trong (\n\n).
 * Dung chung cho noi dung bien tap trong messages/*.json va noi dung dai
 * do Admin nhap (bio, statement, journey...).
 */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 leading-relaxed ${className ?? ""}`}>
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
