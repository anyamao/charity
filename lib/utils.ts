export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Не указано";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Некорректная дата";

    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Не указано";
  }
}
