import type {
  CsdlSchema,
  CsdlAction,
  CsdlParameter as _CsdlParameter,
} from "../parsers/csdl-types.js";
import { resolve, join } from "path";
import {
  csdlTypeToTs,
  csdlTypeToTsWithExpansion,
  toPascalCase as _toPascalCase,
  getEntitySetName,
  isCollectionType,
  extractEntityTypeName,
} from "../utils/typescript-writer.js";
import {
  bindingDoc,
  parametersArgument,
  parametersInterface,
  parametersInterfaceName,
  parseResponseBody,
  REQUEST_BODY_MODULE,
  REQUEST_BODY_SOURCE,
  requestBodyExpression,
} from "../utils/operation-parameters.js";
import {
  writeTypeScriptFile,
  generateIndexFile as _generateIndexFile,
  purgeDirectory,
} from "../utils/file-writer.js";
import { polymorphicParameterType } from "../utils/polymorphism.js";
import { entityReturn, entityResponseInterface } from "../utils/entity-return.js";
import { ENTITY_REFERENCE_EXPORT, ENTITY_REFERENCE_IMPORT } from "../utils/entity-reference.js";
import { bodyEnumType, ENUM_BODY_MODULE, enumBodySource } from "../utils/enum-body.js";
import { exportedEnumNames } from "./complex-types-generator.js";
import { operationNames } from "../utils/overloads.js";
import {
  ENTITY_PAYLOAD_MODULE,
  ENTITY_PAYLOAD_SOURCE,
  entityParameterType,
} from "../utils/entity-payload.js";
import { collectionBinding, ENTITY_SET_PARAM } from "../utils/binding.js";

/**
 * Map Complex* types to their non-Complex EntityType equivalents.
 * Per Microsoft Web API documentation, use EntityMetadata (not ComplexEntityMetadata) for requests/responses.
 * EXCEPTION: ComplexLookupAttributeMetadata for customer lookup columns (per Microsoft docs).
 */
function mapComplexTypeToEntityType(typeName: string): string {
  // EXCEPTION: These Complex* types must remain as-is for customer relationship operations
  if (
    typeName === "ComplexLookupAttributeMetadata" ||
    typeName === "ComplexOneToManyRelationshipMetadata"
  ) {
    return typeName;
  }

  // Map Complex* metadata types to non-Complex versions
  const complexToEntityMap: Record<string, string> = {
    ComplexEntityMetadata: "EntityMetadata",
    ComplexAttributeMetadata: "AttributeMetadata",
    ComplexBigIntAttributeMetadata: "BigIntAttributeMetadata",
    ComplexBooleanAttributeMetadata: "BooleanAttributeMetadata",
    ComplexDateTimeAttributeMetadata: "DateTimeAttributeMetadata",
    ComplexDecimalAttributeMetadata: "DecimalAttributeMetadata",
    ComplexDoubleAttributeMetadata: "DoubleAttributeMetadata",
    ComplexIntegerAttributeMetadata: "IntegerAttributeMetadata",
    ComplexLookupAttributeMetadata: "LookupAttributeMetadata",
    ComplexMemoAttributeMetadata: "MemoAttributeMetadata",
    ComplexMoneyAttributeMetadata: "MoneyAttributeMetadata",
    ComplexStringAttributeMetadata: "StringAttributeMetadata",
    ComplexFileAttributeMetadata: "FileAttributeMetadata",
    ComplexImageAttributeMetadata: "ImageAttributeMetadata",
    ComplexEnumAttributeMetadata: "EnumAttributeMetadata",
    ComplexPicklistAttributeMetadata: "PicklistAttributeMetadata",
    ComplexManagedPropertyAttributeMetadata: "ManagedPropertyAttributeMetadata",
    ComplexUniqueIdentifierAttributeMetadata: "UniqueIdentifierAttributeMetadata",
    ComplexOneToManyRelationshipMetadata: "OneToManyRelationshipMetadata",
    ComplexManyToManyRelationshipMetadata: "ManyToManyRelationshipMetadata",
    ComplexOptionSetMetadata: "OptionSetMetadata",
    ComplexBooleanOptionSetMetadata: "BooleanOptionSetMetadata",
  };

  return complexToEntityMap[typeName] || typeName;
}

/**
 * Generate typed Web API actions.
 *
 * Generates TypeScript classes for all actions (bound and unbound).
 *
 * @param csdl - Parsed CSDL schema
 * @param outputPath - Output directory path
 * @param dryRun - If true, preview without writing
 * @param purge - If true, delete existing output before generating
 */
export async function generateActions(
  csdl: CsdlSchema,
  outputPath: string,
  dryRun: boolean,
  purge = false
): Promise<void> {
  const absolutePath = resolve(outputPath);

  // Filter to Microsoft.Dynamics.CRM actions
  const actions = csdl.actions.filter((a) => a.namespace === "Microsoft.Dynamics.CRM");

  if (dryRun) {
    console.log(`  [DRY RUN] Would write to: ${absolutePath}`);
    console.log(`  [DRY RUN] Files: One .ts file per action (alphabetical)`);
    console.log(`  [DRY RUN] Count: ${String(actions.length)} actions`);
    if (purge) {
      console.log(`  [DRY RUN] Would purge directory first`);
    }
    return;
  }

  // Purge output directory if requested (exclude types folder)
  if (purge) {
    console.log(`\n  🗑️  Purging ${absolutePath}...`);
    await purgeDirectory(absolutePath, ["types"]);
    console.log(`  ✅ Directory purged`);
  }

  // The payload types of entity-typed parameters (#74). EntityReference comes from
  // entities-runtime (#295).
  await writeTypeScriptFile(
    join(absolutePath, "types", `${ENTITY_PAYLOAD_MODULE}.ts`),
    ENTITY_PAYLOAD_SOURCE
  );
  // Enum values in bodies are sent as member names (#232)
  await writeTypeScriptFile(
    join(absolutePath, "internal", `${ENUM_BODY_MODULE}.ts`),
    enumBodySource(csdl)
  );
  // Bodies leave out undefined parameters (#96)
  await writeTypeScriptFile(join(absolutePath, `${REQUEST_BODY_MODULE}.ts`), REQUEST_BODY_SOURCE);

  const generatedFiles: string[] = [];

  // One file per action; overloads with different bindings each get their own (#75)
  const stems = operationNames(actions);
  for (const action of actions) {
    const stem = stems.get(action) ?? action.name;
    try {
      const content = generateActionClass(csdl, action, stem);
      const filename = `${stem}Action.ts`;
      await writeTypeScriptFile(join(absolutePath, filename), content);
      generatedFiles.push(`${stem}Action`);
      console.log(`  ✅ Generated ${filename}`);
    } catch (error) {
      console.error(`  ❌ Failed to generate ${stem}Action.ts:`, error);
      throw error;
    }
  }

  // Generate index.ts
  const indexContent = generateActionsIndex(actions, stems, exportedEnumNames(csdl));
  await writeTypeScriptFile(join(absolutePath, "index.ts"), indexContent);
  console.log(`  ✅ Generated index.ts`);

  console.log(`  Total: ${String(actions.length)} action files`);
}

/**
 * Generate TypeScript class for an action.
 */
function generateActionClass(csdl: CsdlSchema, action: CsdlAction, stem = action.name): string {
  const className = `${stem}Action`;
  const responseInterfaceName = `${stem}Response`;

  // System entities that are filtered out and should be treated as 'any'
  const systemEntities = ["crmbaseentity", "principal", "crmmodelbaseentity", "expando"];

  // Collect all complex type and entity type references used in this file
  const complexTypesUsed = new Set<string>();

  // Check return type
  if (action.returnType) {
    const normalizedReturnType = action.returnType.replace("mscrm.", "Microsoft.Dynamics.CRM.");
    const complexType = csdl.complexTypes.find(
      (ct) => `${ct.namespace}.${ct.name}` === normalizedReturnType
    );

    if (complexType) {
      // Collect types from complex type properties
      for (const prop of complexType.properties) {
        const typeName = csdlTypeToTsWithExpansion(prop.type, csdl);
        // Extract base type name (remove [] suffix if array)
        const baseType = typeName.replace("[]", "");
        // If it's not a primitive type, add it
        if (!["string", "number", "boolean", "any", "unknown"].includes(baseType)) {
          complexTypesUsed.add(baseType);
        }
      }
    } else {
      // Return type might be an entity type or other type not expanded
      const tsType = csdlTypeToTs(action.returnType);
      const baseType = tsType.replace("[]", "");
      if (
        !["string", "number", "boolean", "any", "unknown"].includes(baseType) &&
        !systemEntities.includes(baseType.toLowerCase())
      ) {
        // Map Complex* types to non-Complex EntityType versions
        const mappedType = mapComplexTypeToEntityType(baseType);
        complexTypesUsed.add(mappedType);
      }
    }
  }

  // Check parameters
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  for (const param of action.parameters || []) {
    // A parameter of a base type takes the Typed<Base> union of its derived types (#73)
    const polymorphic = polymorphicParameterType(csdl, param.type);
    if (polymorphic) {
      complexTypesUsed.add(polymorphic.union);
      continue;
    }
    const typeName = csdlTypeToTs(param.type);
    const baseType = typeName.replace("[]", "");
    if (
      !["string", "number", "boolean", "any", "unknown"].includes(baseType) &&
      baseType !== "EntityReference" &&
      !systemEntities.includes(baseType.toLowerCase())
    ) {
      // Map Complex* types to non-Complex EntityType versions
      const mappedType = mapComplexTypeToEntityType(baseType);
      complexTypesUsed.add(mappedType);
    }
  }

  let code = `import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';\n`;

  // Check if EntityReference is needed (from return type or parameters)
  let needsEntityReference = false;

  // Check return type for EntityReference (a single system-entity return is a record, #71)
  if (action.returnType && entityReturn(csdl, action.returnType)?.kind !== "record") {
    const tsType = csdlTypeToTs(action.returnType, false);
    const baseType = tsType.replace("[]", "");
    if (baseType === "EntityReference") {
      needsEntityReference = true;
    }
  }

  // Check parameters for EntityReference (single entity references, not Collections)
  if (!needsEntityReference) {
    needsEntityReference = action.parameters.some(
      (p) => !isCollectionType(p.type) && csdlTypeToTs(p.type, false) === "EntityReference"
    );
  }

  // Entity-typed parameters take an entity payload or a reference (#74)
  const payloadTypes = new Set<string>();
  for (const p of action.parameters) {
    if (p.name === action.bindingParameter?.name || polymorphicParameterType(csdl, p.type))
      continue;
    const entityParam = entityParameterType(csdl, p.type);
    if (!entityParam) continue;
    for (const t of entityParam.payload) payloadTypes.add(t);
    if (entityParam.tsType.includes("EntityReference")) needsEntityReference = true;
  }

  if (needsEntityReference) {
    code += ENTITY_REFERENCE_IMPORT;
  }
  if (action.parameters.some((p) => p.name)) {
    code += `import { requestBody } from './${REQUEST_BODY_MODULE}.js';\n`;
  }
  if (action.parameters.some((p) => bodyEnumType(csdl, p.type))) {
    code += `import { enumBody } from './internal/${ENUM_BODY_MODULE}.js';\n`;
  }
  if (payloadTypes.size > 0) {
    code += `import type { ${[...payloadTypes].sort().join(", ")} } from './types/${ENTITY_PAYLOAD_MODULE}.js';\n`;
  }

  // Import complex types from types folder (excluding EntityReference)
  const complexTypesToImport = Array.from(complexTypesUsed)
    .filter((t) => t !== "EntityReference")
    .sort();
  if (complexTypesToImport.length > 0) {
    code += `import type { ${complexTypesToImport.join(", ")} } from './types/index.js';\n`;
  }

  code += `\n`;

  // Generate response interface
  code += generateResponseInterface(csdl, action, responseInterfaceName);
  code += `\n`;

  // Collection-bound: called on an entity set (#69)
  const collection =
    action.isBound && action.bindingParameter && isCollectionType(action.bindingParameter.type)
      ? collectionBinding(csdl, action.bindingParameter.type)
      : undefined;

  // Constructor arguments: the record or entity set a bound action runs on (in the URL), then
  // one object with the CSDL parameters (#96)
  const constructorParams: Array<{
    name: string;
    type: string;
    tsName: string;
    isBinding: boolean;
    optional?: boolean;
    /** Enum or complex type to pass to `enumBody` (#232). */
    enumType?: string;
  }> = [];

  // Check if binding parameter is a Collection type (e.g., CreateMultiple, UpdateMultiple)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const isCollectionBound =
    action.isBound && action.bindingParameter && isCollectionType(action.bindingParameter.type);

  if (action.isBound && action.bindingParameter && !isCollectionBound) {
    // Single-entity bound: First parameter is the entity ID
    const entityTypeName = extractEntityTypeName(action.bindingParameter.type);
    constructorParams.push({
      name: `${entityTypeName}Id`,
      type: "string",
      tsName: action.bindingParameter.name,
      isBinding: true,
    });
  }

  if (collection?.needsEntitySetName && action.bindingParameter) {
    // Bound to Collection(mscrm.crmbaseentity): the caller names the entity set
    constructorParams.push({
      name: ENTITY_SET_PARAM,
      type: "string",
      tsName: action.bindingParameter.name,
      isBinding: true,
    });
  }

  // Add all non-binding parameters
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  for (const param of action.parameters || []) {
    if (!param.name) continue; // Skip unnamed parameters

    // Skip binding parameter (it's already handled above as entityId)
    if (param.name === action.bindingParameter?.name && !isCollectionBound) {
      continue;
    }

    constructorParams.push({
      name: param.name,
      type:
        polymorphicParameterType(csdl, param.type)?.tsType ??
        entityParameterType(csdl, param.type)?.tsType ??
        csdlTypeToTs(param.type, true),
      tsName: param.name,
      isBinding: false,
      // In CSDL a parameter without Nullable="false" may be left out (#74, as #68 for functions)
      optional: param.nullable !== false,
      enumType: bodyEnumType(csdl, param.type),
    });
  }

  const bindingParams = constructorParams.filter((p) => p.isBinding);
  const bodyParams = constructorParams
    .filter((p) => !p.isBinding)
    .map((p) => ({ name: p.tsName, type: p.type, optional: p.optional === true }));
  const parametersName = parametersInterfaceName(className);
  if (bodyParams.length > 0) {
    code += parametersInterface(parametersName, `${action.name} action`, bodyParams);
    code += `\n`;
  }

  // Generate action class
  code += `/**\n`;
  code += ` * ${action.name} action\n`;
  code += ` *\n`;
  code += ` * ${action.isBound ? "Bound" : "Unbound"} action\n`;
  if (action.bindingParameter) {
    code += ` * Binding parameter: ${action.bindingParameter.name || "unnamed"} (${action.bindingParameter.type})\n`;
  }
  code += bindingDoc(bindingParams[0]?.name, action.bindingParameter?.type);
  code += ` */\n`;
  code += `export class ${className} implements Executable<${responseInterfaceName}> {\n`;

  const ctorArgs = [
    ...bindingParams.map((p) => `public readonly ${p.name}: ${p.type}`),
    ...(bodyParams.length > 0
      ? [parametersArgument("public readonly", parametersName, bodyParams)]
      : []),
  ];
  if (ctorArgs.length > 0) {
    code += `  constructor(\n`;
    for (const arg of ctorArgs) code += `    ${arg},\n`;
    code += `  ) {}\n\n`;
  }

  // Generate toRequestInformation method
  code += `  toRequestInformation(baseUrl: string): RequestInformation {\n`;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (action.isBound && action.bindingParameter && !isCollectionBound) {
    // Single-entity bound action - construct URL with entity ID
    const bindingParam = constructorParams.find((p) => p.isBinding);
    if (!bindingParam) {
      throw new Error(`Bound action ${action.name} missing binding parameter`);
    }

    code += `    // Bound action\n`;

    // Get entity set name from binding parameter type
    const entitySetName = getEntitySetName(action.bindingParameter.type, csdl.entitySetMap);

    if (entitySetName) {
      code += `    const url = \`\${baseUrl}/${entitySetName}(\${this.${bindingParam.name}})/Microsoft.Dynamics.CRM.${action.name}\`;\n\n`;
    } else {
      // Fallback: extract entity type name from binding parameter type
      const entityTypeName = extractEntityTypeName(action.bindingParameter.type);
      code += `    // WARNING: Entity set not found in metadata, using entity type name as fallback\n`;
      code += `    const url = \`\${baseUrl}/${entityTypeName}s(\${this.${bindingParam.name}})/Microsoft.Dynamics.CRM.${action.name}\`;\n\n`;
    }
  } else if (collection) {
    // Collection-bound action: POST /{entityset}/Microsoft.Dynamics.CRM.{name}
    code += `    // Bound action (entity collection)\n`;
    if (collection.warning) code += `    // ${collection.warning}\n`;
    code += `    const url = \`\${baseUrl}/${collection.segment}/Microsoft.Dynamics.CRM.${action.name}\`;\n\n`;
  } else {
    // Unbound action
    code += `    const url = \`\${baseUrl}/${action.name}\`;\n\n`;
  }

  // Build request body: the parameters by their CSDL names, without the undefined ones (#96)
  if (bodyParams.length > 0) {
    const enumTypeOf = (name: string) => constructorParams.find((p) => p.tsName === name)?.enumType;
    code += `    const body = ${requestBodyExpression("this.parameters", bodyParams, enumTypeOf)};\n\n`;
  }

  code += `    return {\n`;
  code += `      method: 'POST',\n`;
  code += `      url,\n`;
  code += `      headers: {\n`;
  // Lower-case, like the names the core sends: an explicit header then replaces the core's JSON
  // default instead of being sent next to it under a second casing (#23).
  code += `        'content-type': 'application/json',\n`;
  code += `      },\n`;
  if (bodyParams.length > 0) {
    code += `      body,\n`;
  }
  code += `    };\n`;
  code += `  }\n\n`;

  // Generate parseResponse method
  code += `  async parseResponse(response: Response): Promise<${responseInterfaceName}> {\n`;
  code += parseResponseBody(responseInterfaceName);
  code += `  }\n`;

  code += `}\n`;

  return code;
}

/**
 * Generate response interface.
 */
function generateResponseInterface(
  csdl: CsdlSchema,
  action: CsdlAction,
  interfaceName: string
): string {
  // An entity return is the entity itself (#71)
  const entityShape = action.returnType ? entityReturn(csdl, action.returnType) : undefined;
  if (entityShape) {
    return entityResponseInterface(
      interfaceName,
      entityShape,
      `Response from ${action.name} action`
    );
  }

  let code = `/**\n`;
  code += ` * Response from ${action.name} action\n`;
  code += ` */\n`;
  code += `export interface ${interfaceName} {\n`;

  if (action.returnType) {
    // Check if return type is a complex type
    // Handle both namespace formats: mscrm.TypeName and Microsoft.Dynamics.CRM.TypeName
    const normalizedReturnType = action.returnType.replace("mscrm.", "Microsoft.Dynamics.CRM.");
    const complexType = csdl.complexTypes.find(
      (ct) => `${ct.namespace}.${ct.name}` === normalizedReturnType
    );

    if (complexType) {
      // Expand complex type properties
      for (const prop of complexType.properties) {
        const tsType = csdlTypeToTsWithExpansion(prop.type, csdl);
        const optional = prop.nullable ? "?" : "";
        code += `  ${prop.name}${optional}: ${tsType};\n`;
      }
    } else {
      // Primitive or collection type
      const tsType = csdlTypeToTs(action.returnType);
      code += `  value: ${tsType};\n`;
    }
  } else {
    code += `  // No content returned\n`;
  }

  code += `}\n`;

  return code;
}

/**
 * Generate index.ts with all exports.
 */
function generateActionsIndex(
  operations: CsdlAction[],
  stems: Map<CsdlAction, string>,
  enumNames: string[]
): string {
  let code = `/**\n`;
  code += ` * @mohsinonxrm/dataverse-sdk-actions\n`;
  code += ` *\n`;
  code += ` * Auto-generated typed Web API actions.\n`;
  code += ` */\n\n`;

  // One export per class: overloads have their own (#75), and a name with no unbound overload
  // has no plain-name export (#286)
  const entries = operations
    .map((op) => ({
      stem: stems.get(op) ?? op.name,
      hasParameters: op.parameters.some((p) => p.name),
    }))
    .sort((a, b) => a.stem.localeCompare(b.stem));
  for (const { stem, hasParameters } of entries) {
    // The parameters interface of the constructor (#96)
    const parameters = hasParameters ? `, type ${parametersInterfaceName(`${stem}Action`)}` : "";
    code += `export { ${stem}Action${parameters}, type ${stem}Response } from './${stem}Action.js';\n`;
  }

  // The SDK's one EntityReference (#295), re-exported from entities-runtime
  code += `\n${ENTITY_REFERENCE_EXPORT}`;
  code += `export type { AnyEntityPayload, EntityPayload } from './types/${ENTITY_PAYLOAD_MODULE}.js';\n`;

  // Enum values for parameters (AccessRights.ReadAccess | AccessRights.WriteAccess), as in the
  // functions package; bodies send them as member names (#232)
  if (enumNames.length > 0) {
    code += `\nexport { ${enumNames.join(", ")} } from './types/index.js';\n`;
  }

  return code;
}
