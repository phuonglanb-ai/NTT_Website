/**
 * Tach mot khoi van ban thanh cac doan theo dong trong (\n\n).
 * Dung chung cho noi dung bien tap trong messages/*.json va noi dung dai
 * do Admin nhap (bio, statement, journey...).
 */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    // Gian dong 1.5 (mac dinh Tailwind la 1.625): cac dong trong cung mot doan
    // bam nhau, doc lien mach. Khoang cach GIUA cac doan van giu rong de tach
    // y -- lien mach trong doan, ro rang giua cac doan.
    <div className={`flex flex-col gap-5 leading-[1.5] ${className ?? ""}`}>
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
