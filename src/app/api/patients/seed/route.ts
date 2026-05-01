import { NextResponse } from "next/server";
import { seedPatients } from "@/lib/patient-repo";

export async function POST() {
  const result = await seedPatients();
  return NextResponse.json(result, { status: result.ok ? 200 : 409 });
}
