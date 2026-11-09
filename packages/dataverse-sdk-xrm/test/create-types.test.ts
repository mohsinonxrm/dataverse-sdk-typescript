import { describe, expectTypeOf, it } from "vitest";
import type { OrganizationService } from "../src/index.js";

// Compile-time assertions, checked by `pnpm typecheck` (tsc over test/**). The bodies are
// never executed: `org` is only declared, so each check lives in an uncalled function.
declare const org: OrganizationService;

interface Account {
  accountid: string;
}

export function defaultCreateIsString(): void {
  expectTypeOf(org.create("accounts", { name: "x" })).toEqualTypeOf<Promise<string>>();
  expectTypeOf(
    org.create("accounts", { name: "x" }, { returnRepresentation: false })
  ).toEqualTypeOf<Promise<string>>();
  expectTypeOf(org.create("accounts", { name: "x" }, { select: ["name"] })).toEqualTypeOf<
    Promise<string>
  >();
}

export function representationCreateIsRecord(): void {
  expectTypeOf(
    org.create<Account>("accounts", { name: "x" }, { returnRepresentation: true })
  ).toEqualTypeOf<Promise<Account>>();
}

describe("OrganizationService.create() overloads (#250)", () => {
  it("is type-checked by tsc (see the functions above)", () => {
    expectTypeOf(defaultCreateIsString).toBeFunction();
    expectTypeOf(representationCreateIsRecord).toBeFunction();
  });
});
