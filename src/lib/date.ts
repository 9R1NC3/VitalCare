export function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

export function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}
