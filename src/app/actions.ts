"use server";

import { revalidatePath } from "next/cache";
import { addPatient, dischargePatient, markDoctorVisit, recordTemperature } from "@/lib/patient-repo";

export type ActionResult = {
  ok: boolean;
  message: string;
};

function toNumber(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return Number.NaN;
  }
  return Number(value);
}

export async function recordTemperatureAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const patientId = String(formData.get("patientId") ?? "");
  const temperature = toNumber(formData.get("temperature"));

  if (!patientId) {
    return { ok: false, message: "Missing patient id." };
  }
  if (Number.isNaN(temperature) || temperature < 90 || temperature > 110) {
    return { ok: false, message: "Enter a valid temperature between 90 and 110 F." };
  }

  const result = await recordTemperature(patientId, temperature);
  revalidatePath("/nurse");
  revalidatePath("/doctor");
  revalidatePath("/admin");
  return result ?? { ok: false, message: "Unknown error occurred." };
}

export async function markDoctorVisitAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const patientId = String(formData.get("patientId") ?? "");
  if (!patientId) {
    return { ok: false, message: "Missing patient id." };
  }

  const result = await markDoctorVisit(patientId);
  revalidatePath("/doctor");
  revalidatePath("/admin");
  return result ?? { ok: false, message: "Unknown error occurred." };
}

export async function dischargePatientAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const patientId = String(formData.get("patientId") ?? "");
  if (!patientId) {
    return { ok: false, message: "Missing patient id." };
  }

  const result = await dischargePatient(patientId);
  revalidatePath("/admin");
  revalidatePath("/nurse");
  revalidatePath("/doctor");
  return result ?? { ok: false, message: "Unknown error occurred." };
}

export async function addPatientAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const roomNumber = String(formData.get("roomNumber") ?? "").trim().toUpperCase();

  if (!name || !roomNumber) {
    return { ok: false, message: "Name and room number are required." };
  }

  const result = await addPatient(name, roomNumber);
  revalidatePath("/admin");
  revalidatePath("/nurse");
  return result ?? { ok: false, message: "Unknown error occurred." };
}
