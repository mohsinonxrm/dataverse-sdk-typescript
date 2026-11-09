import { CodeBlock } from "./CodeBlock";

function stringify(value: unknown): string {
  if (value === undefined) return "undefined";
  return JSON.stringify(
    value,
    (_: string, v: unknown): unknown => {
      if (v instanceof Map) return Object.fromEntries(v);
      if (v instanceof Set) return [...v];
      if (v instanceof Blob) return `(Blob, ${v.size} bytes, ${v.type || "no type"})`;
      if (v instanceof Error) return `${v.name}: ${v.message}`;
      return v;
    },
    2
  );
}

/** A value as formatted JSON (Maps, Blobs and errors made readable). */
export function JsonView({ value, label = "Result" }: { value: unknown; label?: string }) {
  return <CodeBlock code={stringify(value)} plain label={label} />;
}
