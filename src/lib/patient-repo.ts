import { FieldValue } from "firebase-admin/firestore";
import { FEVER_THRESHOLD_F, MAX_CAPACITY, STREAK_FOR_DISCHARGE } from "@/lib/constants";
import { todayISODate } from "@/lib/date";
import { db } from "@/lib/firebase-admin";
import type { Patient, PatientStatus } from "@/lib/types";

const patientsCollection = db.collection("patients");

function toPatient(id: string, payload: FirebaseFirestore.DocumentData): Patient {
  return {
    id,
    name: payload.name,
    roomNumber: payload.roomNumber,
    temperatureLogs: payload.temperatureLogs ?? [],
    feverFreeStreak: payload.feverFreeStreak ?? 0,
    status: payload.status,
    doctorVisitedToday: payload.doctorVisitedToday ?? false,
    createdAt: payload.createdAt,
    dischargedAt: payload.dischargedAt,
  };
}

export async function getPatients() {
  const snapshot = await patientsCollection.orderBy("name", "asc").get();
  return snapshot.docs.map((doc) => toPatient(doc.id, doc.data()));
}

export async function getOccupancyStats() {
  const patients = await getPatients();
  const occupiedBeds = patients.filter((patient) => patient.status !== "DISCHARGED").length;
  const dischargeReadyCount = patients.filter(
    (patient) => patient.status === "READY_FOR_DISCHARGE",
  ).length;
  const dischargedCount = patients.filter((patient) => patient.status === "DISCHARGED").length;
  const mortalityRate = Number(((dischargedCount * 0.02) / Math.max(patients.length, 1) * 100).toFixed(2));

  return {
    occupiedBeds,
    dischargeReadyCount,
    dischargedCount,
    capacityLeft: MAX_CAPACITY - occupiedBeds,
    mortalityRate,
  };
}

export async function addPatient(name: string, roomNumber: string) {
  const stats = await getOccupancyStats();
  if (stats.occupiedBeds >= MAX_CAPACITY) {
    return { ok: false, message: "Facility is full (74/74). Discharge before admitting more patients." };
  }

  const existing = await patientsCollection.where("roomNumber", "==", roomNumber).limit(1).get();
  if (!existing.empty) {
    return { ok: false, message: "Room is already occupied." };
  }

  const payload: Omit<Patient, "id"> = {
    name,
    roomNumber,
    temperatureLogs: [],
    feverFreeStreak: 0,
    status: "TEMP_PENDING",
    doctorVisitedToday: false,
    createdAt: new Date().toISOString(),
  };

  await patientsCollection.add(payload);
  return { ok: true, message: "Patient admitted." };
}

export async function recordTemperature(patientId: string, temperature: number) {
  const today = todayISODate();
  const ref = patientsCollection.doc(patientId);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) {
      return { ok: false, message: "Patient not found." };
    }

   const data = snap.data();
   if (!data) return; 
   const patient = toPatient(snap.id, data);
   
    if (patient.status === "DISCHARGED") {
      return { ok: false, message: "Cannot record temperature for a discharged patient." };
    }

    const alreadyLoggedToday = patient.temperatureLogs.some((log) => log.date === today);
    if (alreadyLoggedToday) {
      return { ok: false, message: "Temperature has already been recorded today." };
    }

    const nextStreak = temperature < FEVER_THRESHOLD_F ? patient.feverFreeStreak + 1 : 0;
    const nextStatus: PatientStatus =
      nextStreak >= STREAK_FOR_DISCHARGE ? "READY_FOR_DISCHARGE" : "READY_FOR_DOCTOR";

    tx.update(ref, {
      temperatureLogs: FieldValue.arrayUnion({ date: today, temperature }),
      feverFreeStreak: nextStreak,
      status: nextStatus,
      doctorVisitedToday: false,
    });

    return { ok: true, message: "Temperature recorded successfully." };
  });
}

export async function markDoctorVisit(patientId: string) {
  const today = todayISODate();
  const ref = patientsCollection.doc(patientId);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) {
      return { ok: false, message: "Patient not found." };
    }

    const data = snap.data();
if (!data) return;
const patient = toPatient(snap.id, data);
    if (patient.status === "DISCHARGED") {
      return { ok: false, message: "Patient already discharged." };
    }

    const todayLog = patient.temperatureLogs.find((log) => log.date === today);
    if (!todayLog) {
      return { ok: false, message: "Temperature not recorded for today. Nurse update required." };
    }

    if (patient.doctorVisitedToday) {
      return { ok: false, message: "Doctor visit already marked for today." };
    }

    tx.update(ref, {
      doctorVisitedToday: true,
      status: patient.status === "READY_FOR_DISCHARGE" ? "READY_FOR_DISCHARGE" : "UNDER_REVIEW",
    });

    return { ok: true, message: "Doctor visit marked complete." };
  });
}

export async function dischargePatient(patientId: string) {
  const ref = patientsCollection.doc(patientId);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) {
      return { ok: false, message: "Patient not found." };
    }

    const data = snap.data();
if (!data) return;
const patient = toPatient(snap.id, data);
    if (patient.status !== "READY_FOR_DISCHARGE") {
      return { ok: false, message: "Patient is not ready for discharge." };
    }

    tx.update(ref, {
      status: "DISCHARGED",
      dischargedAt: new Date().toISOString(),
    });

    return { ok: true, message: "Patient discharged successfully." };
  });
}

export async function seedPatients() {
  const existing = await patientsCollection.limit(1).get();
  if (!existing.empty) {
    return { ok: false, message: "Seed skipped: patients collection already has data." };
  }

  const seeds = [
    { name: "Asha Menon", roomNumber: "A-101" },
    { name: "Ravi Kapoor", roomNumber: "A-102" },
    { name: "Noor Fatima", roomNumber: "A-103" },
    { name: "Kiran Rao", roomNumber: "A-104" },
  ];

  const batch = db.batch();
  seeds.forEach((seed) => {
    const ref = patientsCollection.doc();
    batch.set(ref, {
      ...seed,
      temperatureLogs: [],
      feverFreeStreak: 0,
      status: "TEMP_PENDING",
      doctorVisitedToday: false,
      createdAt: new Date().toISOString(),
    });
  });
  await batch.commit();

  return { ok: true, message: "Sample patients seeded." };
}
