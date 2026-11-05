/**
 * Response shape of an operation that returns a single entity (#71).
 *
 * In OData JSON an entity return is the entity itself
 * (`{ "@odata.context": "$metadata#asyncoperations/$entity", asyncoperationid: … }`); only primitive
 * and collection returns are wrapped in `value`.
 */
import type { CsdlSchema } from "../parsers/csdl-types.js";
import { SYSTEM_ENTITIES } from "./polymorphism.js";

export type EntityReturn = { kind: "entity"; typeName: string } | { kind: "record" };

/**
 * `{ kind: "entity" }` for a single generated entity type, `{ kind: "record" }` for a system base
 * such as `crmbaseentity` (any table), `undefined` for every other return type.
 */
export function entityReturn(csdl: CsdlSchema, returnType: string): EntityReturn | undefined {
  if (returnType.startsWith("Collection(") || returnType.startsWith("Edm.")) return undefined;
  const name = returnType.replace(/^mscrm\.|^Microsoft\.Dynamics\.CRM\./, "");
  if (SYSTEM_ENTITIES.includes(name.toLowerCase())) return { kind: "record" };
  const isEntity = csdl.entityTypes.some(
    (t) => t.namespace === "Microsoft.Dynamics.CRM" && t.name === name
  );
  return isEntity ? { kind: "entity", typeName: name } : undefined;
}

/** The interface body of an entity response: the entity's own properties, plus the annotations. */
export function entityResponseInterface(
  interfaceName: string,
  shape: EntityReturn,
  description: string
): string {
  let code = `/**\n`;
  code += ` * ${description}\n`;
  code += ` *\n`;
  code += ` * The response is the entity itself, not wrapped in \`value\`.\n`;
  code += ` */\n`;
  if (shape.kind === "entity") {
    code += `export interface ${interfaceName} extends ${shape.typeName} {\n`;
  } else {
    code += `export interface ${interfaceName} {\n`;
  }
  code += `  "@odata.context"?: string;\n`;
  code += `  "@odata.etag"?: string;\n`;
  if (shape.kind === "record") code += `  [column: string]: unknown;\n`;
  code += `}\n`;
  return code;
}
