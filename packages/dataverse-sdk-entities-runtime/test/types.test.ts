import { describe, expectTypeOf, it } from "vitest";
import type { ODataTypeName } from "@mohsinonxrm/dataverse-sdk-core";
import {
  type AttributeMetadata,
  type AttributeTypeCodeName,
  type EntityMetadata,
  type EntityReference,
  type IEntity,
  createEntityReference,
  formatEntityForWrite,
  formatParameterAlias,
} from "../src/index.js";

// Compile-time assertions (#294), checked by `pnpm typecheck` (tsc over test/**). The bodies are
// never executed: the values are only declared, so each check lives in an uncalled function.
declare const entity: IEntity;
declare const metadata: EntityMetadata;

/** What `dataverse-gen` generates: an interface that extends `IEntity`. */
interface Account extends IEntity {
  accountid?: string | null;
  name?: string | null;
  creditlimit?: number | null;
  primarycontactid?: EntityReference;
}

export function undeclaredPropertiesAreUnknown(): void {
  expectTypeOf<IEntity[string]>().toEqualTypeOf<unknown>();
  expectTypeOf(entity.name).toEqualTypeOf<unknown>();
  expectTypeOf(entity.id).toEqualTypeOf<string | undefined>();
  expectTypeOf(entity.logicalName).toEqualTypeOf<string | undefined>();

  // @ts-expect-error an undeclared column is unknown until it is checked
  void entity.name.toUpperCase();

  // Checked first, it can be used.
  if (typeof entity.name === "string") void entity.name.toUpperCase();
}

export function generatedInterfacesKeepTheirTypes(): void {
  const account: Account = {
    name: "Contoso",
    creditlimit: 50000,
    primarycontactid: createEntityReference("contact", "1"),
  };
  expectTypeOf(account.name).toEqualTypeOf<string | null | undefined>();
  expectTypeOf(account.creditlimit).toEqualTypeOf<number | null | undefined>();
  // A column the interface doesn't declare is still unknown.
  expectTypeOf(account.telephone1).toEqualTypeOf<unknown>();

  // @ts-expect-error a declared column keeps its type
  const _wrong: Account = { name: 42 };

  expectTypeOf(formatEntityForWrite(account, metadata)).toEqualTypeOf<Record<string, unknown>>();
  formatEntityForWrite({ name: "Contoso", description: null }, metadata);
}

export function metadataTypesAreSuggested(): void {
  // #482: the known names are suggested; any other string is still accepted (new types, and the
  // OData type the generator writes when it doesn't know the attribute type).
  expectTypeOf<"Picklist">().toExtend<AttributeMetadata["attributeType"]>();
  expectTypeOf<"Edm.String">().toExtend<AttributeMetadata["attributeType"]>();
  expectTypeOf<AttributeTypeCodeName>().toExtend<AttributeMetadata["attributeType"]>();
  expectTypeOf<string>().toExtend<AttributeMetadata["attributeType"]>();
  expectTypeOf<AttributeMetadata["odataType"]>().toEqualTypeOf<ODataTypeName | undefined>();
  expectTypeOf<EntityMetadata["attributeTypes"]>().toEqualTypeOf<Record<string, ODataTypeName>>();
  // The generated enum's name, not an option set type: any string.
  expectTypeOf<AttributeMetadata["optionSetType"]>().toEqualTypeOf<string | undefined>();

  const name: AttributeMetadata = {
    logicalName: "name",
    schemaName: "Name",
    attributeType: "String",
    typescriptType: "string",
    odataType: "Edm.String",
  };
  expectTypeOf(name.attributeType).toExtend<string>();
  // @ts-expect-error an AttributeTypeCodeName is one of the known names only
  const _typo: AttributeTypeCodeName = "Picklst";

  expectTypeOf(formatParameterAlias(1, "Edm.Int32")).toEqualTypeOf<string>();
  expectTypeOf(formatParameterAlias("x", "Microsoft.Dynamics.CRM.EntityFilters")).toBeString();
}

describe("IEntity types (#294)", () => {
  it("are type-checked by tsc (see the functions above)", () => {
    expectTypeOf(undeclaredPropertiesAreUnknown).toBeFunction();
    expectTypeOf(generatedInterfacesKeepTheirTypes).toBeFunction();
    expectTypeOf(metadataTypesAreSuggested).toBeFunction();
  });
});
