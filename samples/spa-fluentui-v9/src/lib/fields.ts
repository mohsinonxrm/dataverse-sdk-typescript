import type { SpinButtonOnChangeData } from "@fluentui/react-components";

/** The number a `SpinButton` change gives: its value, or what was typed, or `fallback`. */
export function spinValue(data: SpinButtonOnChangeData, fallback: number): number {
  if (typeof data.value === "number") return data.value;
  const typed = Number(data.displayValue);
  return Number.isFinite(typed) && data.displayValue !== undefined ? typed : fallback;
}
