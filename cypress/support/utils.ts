export function getPrefix(): string {
  const pathname = window.location.pathname;

  const splitter = pathname.includes("%2F") ? "%2F" : "%5C";
  const prefix = pathname.split(splitter).pop()?.split("_")[0];

  return prefix;
}

export function generateRandomIntegerOfLength(length: number): number {
  if (length <= 0 || length > 15) {
    throw new Error("Length must be a positive number between 1 and 15.");
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1));
}
