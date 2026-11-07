/**
 * The Web API's query functions (#342): `LastXDays`, `Between`, `EqualUserId`, `Under`, … .
 *
 * `$metadata` declares them as unbound functions, but Dataverse runs them only inside a `$filter`
 * (`accounts?$filter=Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=7)`).
 * Called on their own (`GET /LastXDays(...)`) they answer 404, so the functions package must not
 * have an `Executable` class for them. Instead it gets `queryFunctions`: one helper per query
 * function that returns the `$filter` expression, each value written as an OData literal of its
 * `$metadata` type by core's `odataLiteral` (#254).
 *
 * A query function is recognised by its shape in the CSDL ({@link isQueryFunction}): every one is
 * unbound, returns `Edm.Boolean` and takes the column as its first parameter, `PropertyName`
 * (`Edm.String`). In the snapshot these are exactly the 71 operations that have no SDK message
 * (`metadata/operation-solutions.json` records them with no solutions): they are built into the
 * OData endpoint, not messages. {@link checkQueryFunctions} fails `regen` if a new snapshot ever
 * makes the two disagree.
 */
import type { CsdlFunction } from "../parsers/csdl-types.js";
import { csdlTypeToTs } from "../utils/typescript-writer.js";

const CRM = "Microsoft.Dynamics.CRM";

/** The generated file in the functions package's `src` folder (without `.ts`). */
export const QUERY_FUNCTIONS_MODULE = "queryFunctions";

/**
 * Whether `fn` is a query function: an unbound `Microsoft.Dynamics.CRM` function that returns
 * `Edm.Boolean` and whose first parameter is the column, `PropertyName` (`Edm.String`). No other
 * function in `$metadata` has that shape (`ValidateFetchXmlExpression` and the other functions
 * that return a boolean value take no `PropertyName`).
 */
export function isQueryFunction(fn: CsdlFunction): boolean {
  const first = fn.parameters[0];
  return (
    fn.namespace === CRM &&
    !fn.isBound &&
    fn.returnType === "Edm.Boolean" &&
    first?.name === "PropertyName" &&
    first.type === "Edm.String"
  );
}

/**
 * Check {@link isQueryFunction} against the recorded solutions (#304): the query functions are
 * exactly the operations with no SDK message, which `snapshot` records with no solutions (`[]`).
 * Throws when they differ, so a new snapshot can't turn a real operation into a filter helper, or
 * leave a new query function as a class that answers 404.
 *
 * @param functions - The functions of the snapshot (without the supplemental operations)
 * @param operationSolutions - `metadata/operation-solutions.json`
 */
export function checkQueryFunctions(
  functions: readonly CsdlFunction[],
  operationSolutions: Readonly<Record<string, readonly string[]>>
): void {
  const byShape = new Set(functions.filter(isQueryFunction).map((f) => f.name));
  const noMessage = new Set(
    Object.entries(operationSolutions)
      .filter(([, solutions]) => solutions.length === 0)
      .map(([name]) => name)
  );
  const notQuery = [...noMessage].filter((n) => !byShape.has(n)).sort();
  const withMessage = [...byShape].filter((n) => !noMessage.has(n)).sort();
  if (notQuery.length > 0 || withMessage.length > 0) {
    throw new Error(
      "query functions (#342): the operations with no SDK message and the functions shaped like a " +
        "query function differ. " +
        (notQuery.length > 0
          ? `No SDK message, but not a query function: ${notQuery.join(", ")}. `
          : "") +
        (withMessage.length > 0
          ? `Shaped like a query function, but with an SDK message: ${withMessage.join(", ")}. `
          : "") +
        "Check isQueryFunction in src/generators/query-functions-generator.ts."
    );
  }
}

/** `LastXDays` → `lastXDays`, the helper's key in `queryFunctions`. */
export function queryFunctionKey(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

/** The TypeScript type a helper takes for a parameter of `odataType`. */
function parameterTsType(fn: CsdlFunction, odataType: string): string {
  const collection = /^Collection\((.*)\)$/.exec(odataType);
  const scalar = collection ? collection[1] : odataType;
  if (!scalar.startsWith("Edm.")) {
    // Every query function takes Edm values; anything else would need its own literal
    throw new Error(
      `query functions (#342): ${fn.name} has a parameter of type ${odataType}, which the ` +
        "queryFunctions helpers can't write"
    );
  }
  const ts =
    scalar === "Edm.DateTimeOffset" || scalar === "Edm.Date"
      ? "string | Date"
      : csdlTypeToTs(scalar, true);
  if (collection) return ts.includes("|") ? `ReadonlyArray<${ts}>` : `readonly ${ts}[]`;
  return ts;
}

const DOCS = "https://learn.microsoft.com/power-apps/developer/data-platform/webapi/reference";

/** The JSDoc and member of one helper in the `queryFunctions` object. */
function helperSource(fn: CsdlFunction): string {
  const params = fn.parameters.filter((p) => p.name);
  const members = params
    .map((p) => `${p.name}${p.nullable === false ? "" : "?"}: ${parameterTsType(fn, p.type)}`)
    .join("; ");
  const signature = params
    .map((p) => `['${p.name}', '${p.type}', ${String(p.nullable === false)}]`)
    .join(", ");
  const shape = params.map((p) => `${p.name}=…`).join(",");
  let code = `  /**\n`;
  code += `   * The ${fn.name} query function, as a \`$filter\` expression:\n`;
  code += `   * \`${CRM}.${fn.name}(${shape})\`.\n`;
  code += `   * \`PropertyName\` is the column's logical name.\n`;
  code += `   *\n`;
  code += `   * @see ${DOCS}/${fn.name.toLowerCase()}\n`;
  code += `   */\n`;
  code += `  ${queryFunctionKey(fn.name)}: (parameters: { ${members} }): string =>\n`;
  code += `    expression('${fn.name}', [${signature}], parameters),\n`;
  return code;
}

/**
 * Source of the functions package's `queryFunctions.ts`: the `queryFunctions` object, one helper
 * per query function in `functions` (sorted by name), each returning
 * `Microsoft.Dynamics.CRM.<Name>(<Parameter>=<literal>,…)`.
 *
 * @throws When a query function name is declared twice (it would need two helpers of one name)
 */
export function queryFunctionsSource(functions: readonly CsdlFunction[]): string {
  const sorted = [...functions].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const keys = new Set<string>();
  for (const fn of sorted) {
    const key = queryFunctionKey(fn.name);
    if (keys.has(key)) {
      throw new Error(`query functions (#342): ${fn.name} is declared more than once`);
    }
    keys.add(key);
  }

  let code = `/**\n`;
  code += ` * The Web API's query functions, as \`$filter\` expressions (#342).\n`;
  code += ` * Generated by tools/generate-sdk-types (query-functions-generator.ts). Do not edit by hand.\n`;
  code += ` *\n`;
  code += ` * \`$metadata\` declares \`LastXDays\`, \`Between\`, \`EqualUserId\`, \`Under\` and the other query\n`;
  code += ` * functions as functions, but Dataverse runs them only inside \`$filter\`: called on their own\n`;
  code += ` * they answer 404. Each helper returns the expression, with every parameter written as the\n`;
  code += ` * OData literal of its \`$metadata\` type by \`odataLiteral\` in \`@mohsinonxrm/dataverse-sdk-core\`\n`;
  code += ` * (strings quoted with \`'\` doubled, collections as JSON arrays, numbers as written). Pass it to\n`;
  code += ` * \`.filter()\`, or combine it with other expressions in \`odata.and()\` and \`odata.or()\`.\n`;
  code += ` *\n`;
  code += ` * Dataverse refuses \`not\` around a query function (\`odata.not(queryFunctions.in(...))\`): use\n`;
  code += ` * the negative function instead, such as \`notIn\`, \`notBetween\`, \`notUnder\`, \`notEqualUserId\`,\n`;
  code += ` * \`notEqualBusinessId\` or \`doesNotContainValues\`.\n`;
  code += ` *\n`;
  code += ` * @example\n`;
  code += ` * \`\`\`typescript\n`;
  code += ` * import { odata } from "@mohsinonxrm/dataverse-sdk-core";\n`;
  code += ` * import { queryFunctions } from "@mohsinonxrm/dataverse-sdk-functions";\n`;
  code += ` *\n`;
  code += ` * // accounts?$filter=(Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=7)\n`;
  code += ` * //   and Microsoft.Dynamics.CRM.EqualUserId(PropertyName='ownerid'))\n`;
  code += ` * const mine = await client\n`;
  code += ` *   .api("accounts")\n`;
  code += ` *   .filter(\n`;
  code += ` *     odata.and(\n`;
  code += ` *       queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 }),\n`;
  code += ` *       queryFunctions.equalUserId({ PropertyName: "ownerid" })\n`;
  code += ` *     )\n`;
  code += ` *   )\n`;
  code += ` *   .get();\n`;
  code += ` * \`\`\`\n`;
  code += ` *\n`;
  code += ` * @see ${DOCS}/queryfunctions\n`;
  code += ` */\n`;
  code += `import { DataverseInvalidRequestError } from '@mohsinonxrm/dataverse-sdk-core';\n`;
  code += `import { formatParameterAlias } from './internal/odataLiteral.js';\n\n`;
  code += `/** The parameters of a query function, in \`$metadata\` order: name, OData type, required. */\n`;
  code += `type Signature = ReadonlyArray<readonly [name: string, odataType: string, required: boolean]>;\n\n`;
  code += `/**\n`;
  code += ` * \`Microsoft.Dynamics.CRM.<name>(<parameter>=<literal>,…)\`. A required parameter that is\n`;
  code += ` * missing (or \`null\`) throws; an optional one that is \`undefined\` is left out.\n`;
  code += ` */\n`;
  code += `function expression(\n`;
  code += `  name: string,\n`;
  code += `  signature: Signature,\n`;
  code += `  parameters: Readonly<Record<string, unknown>>\n`;
  code += `): string {\n`;
  code += `  const args: string[] = [];\n`;
  code += `  for (const [parameter, odataType, required] of signature) {\n`;
  code += `    const value = parameters[parameter];\n`;
  code += `    if (required && (value === undefined || value === null)) {\n`;
  code += `      throw DataverseInvalidRequestError.missingParameter(\`\${parameter} (\${name})\`);\n`;
  code += `    }\n`;
  code += `    if (value === undefined) continue;\n`;
  code += `    args.push(\`\${parameter}=\${formatParameterAlias(value, odataType)}\`);\n`;
  code += `  }\n`;
  code += `  return \`${CRM}.\${name}(\${args.join(',')})\`;\n`;
  code += `}\n\n`;
  code += `/**\n`;
  code += ` * One helper per query function, named like the function in camelCase (\`LastXDays\` →\n`;
  code += ` * \`lastXDays\`, \`In\` → \`in\`). Each takes the parameters by their \`$metadata\` names and returns\n`;
  code += ` * the \`$filter\` expression.\n`;
  code += ` */\n`;
  code += `export const queryFunctions = {\n`;
  for (const fn of sorted) code += helperSource(fn);
  code += `} as const;\n`;
  return code;
}
