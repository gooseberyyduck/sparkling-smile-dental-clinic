export interface ClinicInfo {
  id: number;
  clinic_name: string;
  phone: string | null;
  email: string | null;
  whatsapp_number: string | null;
  address: string | null;
  slot_interval_minutes: number;
}

export async function getClinicInfo(): Promise<ClinicInfo> {
  const response = await fetch(
    "http://localhost:5000/api/clinic"
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Failed to fetch clinic information"
    );
  }

  return data.clinic;
}