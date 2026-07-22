"use client";

import { useSyncExternalStore } from "react";
import { CONTACT } from "@/lib/site";

// Tra ve false khi render tren may chu / luc hydrate, true sau khi da chay
// trong trinh duyet. Day la cach chinh thong de doi noi dung sau hydration
// ma khong gay canh bao hydration mismatch.
const subscribe = () => () => {};
const useIsBrowser = () => useSyncExternalStore(subscribe, () => true, () => false);

/**
 * Hien email cua nghe si nhung KHONG de dia chi day du nam trong HTML do may
 * chu tra ve. Bot thu thap email thuong chi doc HTML tinh, nen:
 *
 *  - Truoc khi hydrate (va trong HTML nguon): hien dang "user [at] domain",
 *    con nguoi van doc duoc, khong phai dia chi hop le de bot lay.
 *  - Sau khi hydrate trong trinh duyet: ghep lai thanh link mailto: binh thuong.
 *
 * Day la muc CO BAN theo yeu cau -- chan bot don gian, khong chan duoc bot
 * biet chay JavaScript.
 */
export function ObfuscatedEmail({ className }: { className?: string }) {
  const revealed = useIsBrowser();

  if (!revealed) {
    return (
      <span className={className}>
        {CONTACT.emailUser} [at] {CONTACT.emailDomain}
      </span>
    );
  }

  const address = `${CONTACT.emailUser}@${CONTACT.emailDomain}`;
  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  );
}
