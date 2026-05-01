import { dischargePatientAction } from "@/app/actions";
import { AddPatientForm } from "@/components/add-patient-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { RowActionForm } from "@/components/row-action-form";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { MAX_CAPACITY } from "@/lib/constants";
import { getOccupancyStats, getPatients } from "@/lib/patient-repo";

export default async function AdminPage() {
  const [patients, stats] = await Promise.all([getPatients(), getOccupancyStats()]);
  const dischargeCandidates = patients.filter((p) => p.status === "READY_FOR_DISCHARGE");

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <DashboardHeader title="Admin Dashboard" />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current Occupancy" value={`${stats.occupiedBeds}/${MAX_CAPACITY}`} />
        <StatCard label="Discharge Ready" value={stats.dischargeReadyCount} />
        <StatCard label="Discharged" value={stats.dischargedCount} />
        <StatCard label="Mortality Rate (Dummy)" value={`${stats.mortalityRate}%`} />
      </section>

      <AddPatientForm />

      <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.4)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {dischargeCandidates.map((patient) => {
              return (
                <tr key={patient.id} className="border-t border-slate-100 align-top transition-colors hover:bg-emerald-50/35">
                  <td className="px-4 py-3 font-medium">{patient.name}</td>
                  <td className="px-4 py-3">{patient.roomNumber}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-4 py-3">
                    <RowActionForm
                      patientId={patient.id}
                      actionLabel="Discharge"
                      pendingLabel="Discharging..."
                      actionFn={dischargePatientAction}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {dischargeCandidates.length === 0 ? (
          <p className="border-t border-slate-100 px-4 py-6 text-center text-sm text-slate-500">
            No patients currently meet discharge criteria.
          </p>
        ) : null}
      </section>

      <p className="flex items-center gap-2 text-sm text-slate-600">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M10 3l6 3v4c0 4-2.2 6.4-6 7-3.8-.6-6-3-6-7V6l6-3Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </span>
        Total discharge-ready patients right now: <strong>{dischargeCandidates.length}</strong>
      </p>
    </main>
  );
}
