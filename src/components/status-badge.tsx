import { formatStatus } from "@/lib/date";
import type { PatientStatus } from "@/lib/types";

const tones: Record<PatientStatus, string> = {
  ADMITTED: "border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700",
  TEMP_PENDING: "border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800",
  READY_FOR_DOCTOR: "border border-sky-200 bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-800",
  UNDER_REVIEW: "border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-800",
  READY_FOR_DISCHARGE: "border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800",
  DISCHARGED: "border border-zinc-200 bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-700",
};

export function StatusBadge({ status }: { status: PatientStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${tones[status]}`}
    >
      {formatStatus(status)}
    </span>
  );
}
