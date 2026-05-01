"use client";

import { useActionState, useMemo } from "react";
import { addPatientAction, type ActionResult } from "@/app/actions";
import { AlertMessage } from "@/components/alert-message";

const initialState: ActionResult = { ok: false, message: "" };

export function AddPatientForm() {
  const [state, action, pending] = useActionState(addPatientAction, initialState);
  const isSuccess = useMemo(() => state.ok && !!state.message, [state]);

  return (
    <form
      action={action}
      className="interactive-card grid gap-3 rounded-2xl border border-slate-200/90 bg-gradient-to-r from-white via-cyan-50/60 to-emerald-50/40 p-5 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.4)] md:grid-cols-[1fr_170px_auto]"
    >
      <input
        name="name"
        placeholder="Patient name"
        required
        className="focus-ring h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition"
      />
      <input
        name="roomNumber"
        placeholder="Room #"
        required
        className="focus-ring h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm uppercase outline-none transition"
      />
      <button
        type="submit"
        disabled={pending}
        className="focus-ring h-11 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 px-4 text-sm font-semibold text-white transition hover:from-cyan-700 hover:to-teal-700 disabled:opacity-50"
      >
        {pending ? "Admitting..." : "Admit Patient"}
      </button>
      <div className="md:col-span-3">
        <AlertMessage message={state.message} ok={isSuccess} />
      </div>
    </form>
  );
}
