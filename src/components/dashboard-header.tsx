import Link from "next/link";

const items = [
  { href: "/nurse", label: "Nurse Dashboard" },
  { href: "/doctor", label: "Doctor Dashboard" },
  { href: "/admin", label: "Admin Dashboard" },
];

export function DashboardHeader({ title }: { title: string }) {
  return (
    <header className="mb-8 flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-white via-sky-50/80 to-emerald-50/60 p-6 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.45)] backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Virus Quarantine Facility
        </p>
        <h1 className="mt-1 bg-gradient-to-r from-slate-900 to-cyan-700 bg-clip-text text-2xl font-semibold text-transparent md:text-[1.75rem]">
          {title}
        </h1>
      </div>
      <nav className="flex flex-wrap gap-2 rounded-xl border border-cyan-100 bg-white/80 p-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="focus-ring rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-cyan-600 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
