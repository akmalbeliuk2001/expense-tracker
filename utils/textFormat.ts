// utils/textFormat.ts

export const toKebab = (txt: string) =>
  txt.trim().toLowerCase().split(/\s+/).join("-");

export const toCapitalize = (txt: string) =>
  txt
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
