import { NextResponse } from "next/server";
import { getPatients } from "@/lib/patient-repo";

export async function GET() {
  const patients = await getPatients();
  return NextResponse.json({ patients });
}
