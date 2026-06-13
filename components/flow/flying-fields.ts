import { extractionFields } from "@/data/demo";

const keys = ["invoiceNumber", "debtor", "invoiceDate", "dueDate", "net", "vat", "gross", "status"] as const;

export const flyingFields = extractionFields.slice(0, 8).map((field, index) => ({
  ...field,
  key: keys[index],
}));

export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
