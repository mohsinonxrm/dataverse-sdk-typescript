/**
 * #284: OrganizationService's result types. `execute()` infers its response from the request's
 * `Executable<T>`, and the record-returning methods default to `EntityRecord` instead of `any`.
 */
import { describe, expectTypeOf, it } from "vitest";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import type { WhoAmIResponse } from "@mohsinonxrm/dataverse-sdk-functions";
import {
  ExecuteWorkflowRequest,
  OrganizationRequest,
  OrganizationResponse,
} from "@mohsinonxrm/dataverse-sdk-messages";
import type { ExecuteWorkflowResponse } from "@mohsinonxrm/dataverse-sdk-messages";
import type {
  CreateOptions,
  EntityRecord,
  OrganizationService,
  RetrieveMultipleResult,
  UpdateOptions,
} from "../src/index.js";

// Compile-time assertions, checked by `pnpm typecheck` (tsc over test/**). The bodies are
// never executed: `org` is only declared, so each check lives in an uncalled function.
declare const org: OrganizationService;
declare const signal: AbortSignal;

const ID = "12345678-1234-1234-1234-123456789012";

/** A record type of the caller's own, with no index signature. */
interface Account {
  accountid: string;
  name: string;
}
declare const account: Account;

export function executeInfersTheResponse(): void {
  expectTypeOf(org.execute(new WhoAmIFunction())).toEqualTypeOf<Promise<WhoAmIResponse>>();
  expectTypeOf(org.execute(new WhoAmIFunction(), { signal })).toEqualTypeOf<
    Promise<WhoAmIResponse>
  >();
  expectTypeOf(org.execute(new ExecuteWorkflowRequest(ID, { EntityId: ID }))).toEqualTypeOf<
    Promise<ExecuteWorkflowResponse>
  >();
  expectTypeOf(org.execute(new OrganizationRequest("new_Action"))).toEqualTypeOf<
    Promise<OrganizationResponse>
  >();

  // An explicit type argument that matches the request still compiles.
  expectTypeOf(
    org.execute<OrganizationResponse>(new OrganizationRequest("new_Action"))
  ).toEqualTypeOf<Promise<OrganizationResponse>>();

  // A hand-written Executable works the same way.
  const custom: Executable<{ Version: string }> = {
    toRequestInformation: (baseUrl) => ({
      method: "GET",
      url: `${baseUrl}/RetrieveVersion()`,
      headers: {},
    }),
    parseResponse: async (res) => (await res.json()) as { Version: string },
  };
  expectTypeOf(org.execute(custom)).toEqualTypeOf<Promise<{ Version: string }>>();
}

export function executeRejectsNonExecutables(): void {
  // @ts-expect-error -- not an Executable<T>
  void org.execute({ name: "NotExecutable" });
  // @ts-expect-error -- an explicit type that the request doesn't produce
  void org.execute<WhoAmIResponse>(new OrganizationRequest("new_Action"));
}

export function entityRecordShape(): void {
  expectTypeOf<EntityRecord["@odata.etag"]>().toEqualTypeOf<string | undefined>();
  expectTypeOf<EntityRecord["name"]>().toEqualTypeOf<unknown>();
  expectTypeOf<EntityRecord>().not.toBeAny();
  expectTypeOf<RetrieveMultipleResult["value"]>().toEqualTypeOf<EntityRecord[]>();
}

export function retrieveDefaultsToEntityRecord(): void {
  expectTypeOf(org.retrieve("accounts", ID)).toEqualTypeOf<Promise<EntityRecord>>();
  expectTypeOf(org.retrieve("accounts", ID, { select: ["name"] })).toEqualTypeOf<
    Promise<EntityRecord>
  >();
  expectTypeOf(org.retrieve<Account>("accounts", ID)).toEqualTypeOf<Promise<Account>>();
}

export function retrieveMultipleDefaultsToEntityRecord(): void {
  expectTypeOf(org.retrieveMultiple("accounts"))
    .resolves.toHaveProperty("value")
    .toEqualTypeOf<EntityRecord[]>();
  expectTypeOf(org.retrieveMultiple<Account>("accounts", { top: 1 })).toEqualTypeOf<
    Promise<RetrieveMultipleResult<Account>>
  >();
}

export function updateResultFollowsReturnRepresentation(): void {
  expectTypeOf(org.update("accounts", ID, { name: "x" })).toEqualTypeOf<Promise<void>>();
  expectTypeOf(org.update("accounts", ID, { name: "x" }, { etag: 'W/"1"' })).toEqualTypeOf<
    Promise<void>
  >();
  expectTypeOf(
    org.update("accounts", ID, { name: "x" }, { returnRepresentation: true })
  ).toEqualTypeOf<Promise<EntityRecord>>();
  expectTypeOf(
    org.update<Account>("accounts", ID, { name: "x" }, { returnRepresentation: true })
  ).toEqualTypeOf<Promise<Account>>();

  // Not known at compile time: either.
  const options: UpdateOptions = {};
  expectTypeOf(org.update("accounts", ID, { name: "x" }, options)).toEqualTypeOf<
    Promise<EntityRecord | undefined>
  >();
}

export function createRepresentationDefaultsToEntityRecord(): void {
  expectTypeOf(org.create("accounts", { name: "x" }, { returnRepresentation: true })).toEqualTypeOf<
    Promise<EntityRecord>
  >();
  const options: CreateOptions = {};
  expectTypeOf(org.create("accounts", { name: "x" }, options)).toEqualTypeOf<
    Promise<string | EntityRecord>
  >();
}

export function writesAcceptTypedRecords(): void {
  // An interface has no index signature, so `Record<string, unknown>` would reject it.
  expectTypeOf(org.create("accounts", account)).toEqualTypeOf<Promise<string>>();
  expectTypeOf(org.update("accounts", ID, account)).toEqualTypeOf<Promise<void>>();
  // @ts-expect-error -- a record is an object, not a primitive
  void org.create("accounts", "name=x");
}

describe("OrganizationService result types (#284)", () => {
  it("is type-checked by tsc (see the functions above)", () => {
    expectTypeOf(executeInfersTheResponse).toBeFunction();
    expectTypeOf(executeRejectsNonExecutables).toBeFunction();
    expectTypeOf(entityRecordShape).toBeFunction();
    expectTypeOf(retrieveDefaultsToEntityRecord).toBeFunction();
    expectTypeOf(retrieveMultipleDefaultsToEntityRecord).toBeFunction();
    expectTypeOf(updateResultFollowsReturnRepresentation).toBeFunction();
    expectTypeOf(createRepresentationDefaultsToEntityRecord).toBeFunction();
    expectTypeOf(writesAcceptTypedRecords).toBeFunction();
  });
});
