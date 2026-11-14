import { describe, expectTypeOf, it } from "vitest";
import type { HttpMethod } from "@mohsinonxrm/dataverse-sdk-core";
import {
  type BatchExecutionResult,
  type BatchMethod,
  type BatchRequestBuilder,
  type BatchRequestStep,
  type BatchResponsePart,
  type BatchResponseStep,
  type DataverseBatchError,
  decodeBatchResponse,
} from "../src/index.js";

// Compile-time assertions (#294), checked by `pnpm typecheck` (tsc over test/**). The bodies are
// never executed: the values are only declared, so each check lives in an uncalled function.
declare const builder: BatchRequestBuilder;
declare const result: BatchExecutionResult;
declare const batchError: DataverseBatchError;

interface WhoAmIResponse {
  UserId: string;
  BusinessUnitId: string;
  OrganizationId: string;
}

interface Account {
  accountid: string;
  name: string;
}

export function responseBodiesAreUnknown(): void {
  expectTypeOf<BatchResponseStep["body"]>().toEqualTypeOf<unknown>();
  expectTypeOf<BatchResponsePart["body"]>().toEqualTypeOf<unknown>();
  // `BatchResponseStep` without a type argument is `BatchResponseStep<unknown>`.
  expectTypeOf(result.responses).toEqualTypeOf<Map<string, BatchResponseStep>>();
  expectTypeOf(result.results).toEqualTypeOf<BatchResponseStep[]>();
  expectTypeOf(decodeBatchResponse("", "")).toEqualTypeOf<BatchResponsePart[]>();
  expectTypeOf(batchError.result).toEqualTypeOf<BatchExecutionResult | undefined>();
  expectTypeOf(batchError.getErrorForRequest("x")).toEqualTypeOf<BatchResponseStep | undefined>();
  expectTypeOf(batchError.getErrorForRequest("x")?.body).toEqualTypeOf<unknown>();

  const who = result.responses.get("who");
  // @ts-expect-error a body is unknown until it is checked or its type is named
  expectTypeOf(who?.body?.UserId).toBeString();
  // @ts-expect-error the same for a decoded part
  expectTypeOf(decodeBatchResponse("", "")[0]?.body?.UserId).toBeString();
}

export function bodyTypeCanBeNamed(): void {
  expectTypeOf<BatchResponseStep<WhoAmIResponse>["body"]>().toEqualTypeOf<
    WhoAmIResponse | undefined
  >();
  expectTypeOf<BatchResponsePart<Account>["body"]>().toEqualTypeOf<Account | undefined>();

  // A response whose shape the caller knows: name it where it is read.
  const who = result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined;
  expectTypeOf(who?.body?.UserId).toEqualTypeOf<string | undefined>();

  // A step with a named body is still a step (for helpers that take any response).
  expectTypeOf<BatchResponseStep<WhoAmIResponse>>().toExtend<BatchResponseStep>();
}

export function requestBodiesAreUnknown(): void {
  expectTypeOf<BatchRequestStep["body"]>().toEqualTypeOf<unknown>();
  expectTypeOf<Parameters<BatchRequestBuilder["addRequest"]>[4]>().toEqualTypeOf<unknown>();

  // Anything is accepted: objects (JSON-encoded), strings (sent as they are), typed records.
  const account: Account = { accountid: "1", name: "Contoso" };
  builder.addRequest("a", "POST", "accounts", undefined, { name: "Contoso" });
  builder.addRequest("b", "POST", "accounts", undefined, '{"name":"Contoso"}');
  builder.addRequest("c", "PATCH", "accounts(1)", undefined, account);
  const step: BatchRequestStep = { id: "d", method: "POST", url: "accounts", body: account };
  expectTypeOf(step.body).toEqualTypeOf<unknown>();
}

export function methodsAreHttpMethods(): void {
  expectTypeOf<BatchRequestStep["method"]>().toEqualTypeOf<BatchMethod>();
  expectTypeOf<Parameters<BatchRequestBuilder["addRequest"]>[1]>().toEqualTypeOf<BatchMethod>();
  expectTypeOf<HttpMethod>().toExtend<BatchMethod>();
  expectTypeOf<"patch">().toExtend<BatchMethod>();

  builder.addRequest("a", "DELETE", "accounts(1)").addRequest("b", "put", "accounts(1)/name");
  // @ts-expect-error a misspelt method is a compile error (#480)
  builder.addRequest("c", "PSOT", "accounts");
  // @ts-expect-error so is an arbitrary string
  builder.addRequest("d", "" as string, "accounts");
  // @ts-expect-error and a step with a method the Web API doesn't take
  const _head: BatchRequestStep = { id: "e", method: "HEAD", url: "accounts" };
}

describe("batch body types (#294)", () => {
  it("are type-checked by tsc (see the functions above)", () => {
    expectTypeOf(responseBodiesAreUnknown).toBeFunction();
    expectTypeOf(bodyTypeCanBeNamed).toBeFunction();
    expectTypeOf(requestBodiesAreUnknown).toBeFunction();
    expectTypeOf(methodsAreHttpMethods).toBeFunction();
  });
});
