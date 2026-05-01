"use client";

import { useActionState, useMemo } from "react";
import { type ActionResult } from "@/app/actions";
import { AlertMessage } from "@/components/alert-message";

const initialState: ActionResult = { ok: false, message: "" };

type Props = {
  patientId: string;
  actionLabel: string;
  warning?: string;
  disabled?: boolean;
  pendingLabel?: string;
  successMessage?: string;
  actionFn: (_prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  includeTemperatureInput?: boolean;
};

export function RowActionForm({
  patientId,
  actionLabel,
  warning,
  disabled,
  pendingLabel,
  successMessage,
  actionFn,
  includeTemperatureInput,
}: Props) {
  const [state, action, pending] = useActionState(actionFn, initialState);
  const ok = useMemo(() => state.ok && !!state.message, [state]);

  return (
    <form action={action} className="flex flex-col gap-2.5">
      <input type="hidden" name="patientId" value={patientId} />
      {includeTemperatureInput ? (
        <input
          type="number"
          name="temperature"
          step="0.1"
          min={90}
          max={110}
          placeholder="Temp (F)"
          className="focus-ring h-9 w-32 rounded-lg border border-slate-300 bg-white px-3 text-xs outline-none transition"
          required
          disabled={disabled || pending}
        />
      ) : null}
      <button
        type="submit"
        disabled={disabled || pending}
        className="focus-ring h-9 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 px-3 text-xs font-semibold text-white transition hover:from-cyan-700 hover:to-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {pending ? pendingLabel ?? "Working..." : actionLabel}
      </button>
      <AlertMessage message={state.message || (ok ? successMessage : undefined)} ok={ok} />
      {!state.message && warning ? <AlertMessage message={warning} /> : null}
    </form>
  );
}
