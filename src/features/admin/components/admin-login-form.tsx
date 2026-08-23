"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/features/admin/actions";
import { buttonClassName, Input } from "@/components/ui";

const initial: { ok: false; error: string } | null = null;

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, initial);

  return (
    <form action={action} className="mx-auto flex w-full max-w-md flex-col gap-4 border border-border bg-surface p-6 sm:p-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Admin</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to edit portfolio content and work.
        </p>
      </div>
      <Input
        name="username"
        label="Username"
        autoComplete="username"
        required
        defaultValue=""
      />
      <Input
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        required
      />
      {state && !state.ok ? (
        <p className="text-sm text-danger">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className={buttonClassName({ size: "lg" })}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
