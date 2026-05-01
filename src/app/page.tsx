import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-10">
      <div className="interactive-card w-full rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-cyan-50/60 to-emerald-50/50 p-8 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.5)] backdrop-blur md:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Virus Quarantine & Treatment Facility
        </p>
        <h1 className="mt-2 bg-gradient-to-r from-slate-900 via-cyan-700 to-teal-700 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
          Operations Console
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Choose a role-specific dashboard to manage daily patient care workflow.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link
            href="/nurse"
            className="focus-ring interactive-card rounded-xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-sky-50 p-4 text-sm font-semibold text-cyan-900"
          >
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Nurse Dashboard
            </span>
          </Link>
          <Link
            href="/doctor"
            className="focus-ring interactive-card rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 text-sm font-semibold text-teal-900"
          >
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Doctor Dashboard
            </span>
          </Link>
          <Link
            href="/admin"
            className="focus-ring interactive-card rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 text-sm font-semibold text-emerald-900"
          >
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M10 3l6 3v4c0 4-2.2 6.4-6 7-3.8-.6-6-3-6-7V6l6-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              Admin Dashboard
            </span>
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          First-time setup: set Firebase env vars, then call POST /api/patients/seed once.
        </p>
      </div>
    </main>
  );
}
