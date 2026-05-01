import { recordTemperatureAction } from "@/app/actions";
import { DashboardHeader } from "@/components/dashboard-header";
import { RowActionForm } from "@/components/row-action-form";
import { StatusBadge } from "@/components/status-badge";
import { todayISODate } from "@/lib/date";
import { getPatients } from "@/lib/patient-repo";

export default async function NursePage() {
  const patients = await getPatients();
  const today = todayISODate();

  const patientsNeedingTemperature = patients.filter((patient) => {
    if (patient.status === "DISCHARGED") return false;
    return !patient.temperatureLogs.some((log) => log.date === today);
  });

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-8">
      <DashboardHeader title="Nurse Dashboard" />
      <section className="interactive-card mb-4 rounded-2xl border border-cyan-200/90 bg-gradient-to-r from-cyan-50 to-sky-50 px-5 py-4 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.4)]">
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cyan-100 text-cyan-700">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          Patients awaiting today&apos;s temperature recording:{" "}
          <span className="font-semibold text-slate-900">{patientsNeedingTemperature.length}</span>
        </p>
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.4)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-cyan-50 to-sky-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Fever-Free Streak</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {patientsNeedingTemperature.map((patient) => {
              return (
                <tr key={patient.id} className="border-t border-slate-100 align-top transition-colors hover:bg-cyan-50/40">
                  <td className="px-4 py-3 font-medium">{patient.name}</td>
                  <td className="px-4 py-3">{patient.roomNumber}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-4 py-3">{patient.feverFreeStreak}</td>
                  <td className="px-4 py-3">
                    <RowActionForm
                      patientId={patient.id}
                      actionLabel="Log Temperature"
                      pendingLabel="Saving..."
                      includeTemperatureInput
                      actionFn={recordTemperatureAction}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {patientsNeedingTemperature.length === 0 ? (
          <p className="border-t border-slate-100 px-4 py-6 text-center text-sm text-slate-500">
            All active patients have today&apos;s temperature logged.
          </p>
        ) : null}
      </section>
    </main>
  );
}
