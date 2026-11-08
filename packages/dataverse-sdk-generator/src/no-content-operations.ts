/**
 * Operations Dataverse answers `204 No Content` although the CSDL declares a return type, by
 * their CSDL name, with the documentation that says so. Reading their response as JSON throws
 * ("Unexpected end of JSON input"), so their generated `parseResponse` resolves `null` for a 204
 * and their value is typed `<Type> | null`. Only a primitive or complex return is affected: an
 * entity is already `null` for a 204, a collection `[]`.
 *
 * The in-repo generator keeps the same list (tools/generate-sdk-types,
 * src/utils/operation-return.ts); its test/return-shapes.test.ts checks that the two agree.
 */
export const NO_CONTENT_OPERATIONS: Readonly<Record<string, { reason: string; docs: string }>> = {
  UpsertMultiple: {
    reason:
      "The `UpsertMultiple` action returns `204 NoContent`. The `UpsertMultipleResponse` complex type isn't returned.",
    docs: "https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples",
  },
};

/** The operation is in {@link NO_CONTENT_OPERATIONS}. */
export function isNoContentOperation(operation: string): boolean {
  return Object.hasOwn(NO_CONTENT_OPERATIONS, operation);
}

/** The doc comment lines for an operation in {@link NO_CONTENT_OPERATIONS}. */
export function noContentDoc(operation: string): string {
  const entry = NO_CONTENT_OPERATIONS[operation];
  const text =
    `\`null\` when the Web API answers 204 No Content, as it does for ${operation} although the ` +
    `CSDL declares a return type: "${entry.reason}"`;
  // Wrapped at 100 columns, as prettier leaves comments as they are
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line !== "" && ` * ${line} ${word}`.length > 100) {
      lines.push(line);
      line = word;
    } else {
      line = line === "" ? word : `${line} ${word}`;
    }
  }
  lines.push(line);
  return `${lines.map((l) => ` * ${l}\n`).join("")} *\n * @see ${entry.docs}\n`;
}
