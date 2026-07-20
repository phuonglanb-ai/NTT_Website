"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/login/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm text-text-muted">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-accent-oxblood">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 border border-accent-cobalt px-4 py-2 text-sm text-text transition-colors hover:bg-accent-cobalt disabled:opacity-50"
      >
        {pending ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>
    </form>
  );
}
