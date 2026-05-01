export function AlertMessage({ message, ok = false }: { message?: string; ok?: boolean }) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={`rounded-lg border px-3 py-2 text-sm ${
        ok
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-rose-200 bg-rose-50 text-rose-900"
      }`}
    >
      {message}
    </p>
  );
}
