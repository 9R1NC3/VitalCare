import { markDoctorVisitAction } from "@/app/actions";
import { DashboardHeader } from "@/components/dashboard-header";
import { RowActionForm } from "@/components/row-action-form";
import { StatusBadge } from "@/components/status-badge";
import { todayISODate } from "@/lib/date";
import { getPatients } from "@/lib/patient-repo";
export const dynamic = "force-dynamic";

export default async function DoctorPage() {
  const patients = await getPatients();
  const today = todayISODate();

  const readyForVisitPatients = patients.filter((patient) => {
    if (patient.status === "DISCHARGED") return false;
    const hasTodayTemp = patient.temperatureLogs.some((log) => log.date === today);
    return hasTodayTemp && !patient.doctorVisitedToday;
  });

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-8">
      <DashboardHeader title="Doctor Dashboard" />
      <section className="interactive-card mb-4 rounded-2xl border border-teal-200/90 bg-gradient-to-r from-teal-50 to-cyan-50 px-5 py-4 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.4)]">
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-teal-100 text-teal-700">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          Patients ready for doctor rounds:{" "}
          <span className="font-semibold text-slate-900">{readyForVisitPatients.length}</span>
        </p>
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.4)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-teal-50 to-cyan-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Doctor Visited Today</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {readyForVisitPatients.map((patient) => {
              return (
                <tr key={patient.id} className="border-t border-slate-100 align-top transition-colors hover:bg-teal-50/35">
                  <td className="px-4 py-3 font-medium">{patient.name}</td>
                  <td className="px-4 py-3">{patient.roomNumber}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-4 py-3">{patient.doctorVisitedToday ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    <RowActionForm
                      patientId={patient.id}
                      actionLabel="Mark Visit Complete"
                      pendingLabel="Saving..."
                      actionFn={markDoctorVisitAction}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {readyForVisitPatients.length === 0 ? (
          <p className="border-t border-slate-100 px-4 py-6 text-center text-sm text-slate-500">
            No patients are pending a doctor visit right now.
          </p>
        ) : null}
      </section>
    </main>
  );
}
