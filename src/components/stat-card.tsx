import type { ReactNode } from "react";

export function StatCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="interactive-card rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-cyan-50/70 p-5 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.4)]">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-cyan-100 text-cyan-700">
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
        {label}
      </p>
      <p className="mt-2 bg-gradient-to-r from-slate-900 to-cyan-700 bg-clip-text text-2xl font-semibold text-transparent">{value}</p>
    </div>
  );
}
