"use client";

import { useActionState, useState } from "react";
import { login } from "@/app/admin/login/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

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
          className="border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt-bright"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm text-text-muted">
          Mật khẩu
        </label>
        <div className="flex items-stretch gap-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className="flex-1 border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt-bright"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="border border-white/15 px-3 text-xs text-text-muted hover:text-text"
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-accent-oxblood">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 border border-accent-cobalt-bright px-4 py-2 text-sm text-text transition-colors hover:bg-accent-cobalt disabled:opacity-50"
      >
        {pending ? "Đang đăng nhập…" : "Đăng nhập"}
      </button>
    </form>
  );
}
