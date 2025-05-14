/**
 * Formats a date to a string using Intl.DateTimeFormat.
 *
 * @param date - The date to format.
 * @param options - Optional Intl.DateTimeFormatOptions to customize the output.
 * @returns A string representing the formatted date.
 *
 * @example
 * formatDate(new Date()); // returns "October 5, 2023"
 *
 * @example
 * formatDate(new Date(), { month: "2-digit", day: "2-digit", year: "numeric" }); // returns "10/05/2023"
 */
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Converts a date to a string in the format YYYY-MM-DD.
 *
 * @param date - The date to convert.
 * @returns A string representing the date in the format YYYY-MM-DD.
 *
 * @example
 * dateToString(new Date()); // returns "2023-10-05"
 */
export function dateToString(date: Date) {
  date = new Date(date);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Converts a string in the format YYYY-MM-DD to a Date object.
 *
 * @param dateString - The date string to convert.
 * @returns A Date object representing the date string.
 *
 * @example
 * stringToDate("2023-10-05"); // returns a Date object representing October 5, 2023
 */
export function stringToDate(dateString: string) {
  return new Date(dateString + "T00:00:00");
}
