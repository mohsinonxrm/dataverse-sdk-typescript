import { describe, expectTypeOf, it } from "vitest";
import {
  type EntityMetadata,
  type EntityReference,
  type IEntity,
  createEntityReference,
  formatEntityForWrite,
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

describe("IEntity types (#294)", () => {
  it("are type-checked by tsc (see the functions above)", () => {
    expectTypeOf(undeclaredPropertiesAreUnknown).toBeFunction();
    expectTypeOf(generatedInterfacesKeepTheirTypes).toBeFunction();
  });
});
