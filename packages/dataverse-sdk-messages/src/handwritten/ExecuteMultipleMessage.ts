/**
 * ExecuteMultiple message (#344). Hand-written: the Web API has no ExecuteMultiple action; the
 * requests are sent as one `$batch`, each as its own part (not in a change set).
 */
import {
  parseODataError,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import {
  batchRequestInformation,
  batchStep,
  checkRequestCount,
  partResponse,
  readBatch,
  succeeded,
} from "./internal.js";

/** The response type of each request of a list, in order: what its `parseResponse` resolves. */
export type ExecuteResponses<TRequests extends ReadonlyArray<Executable<unknown>>> = {
  -readonly [K in keyof TRequests]: TRequests[K] extends Executable<infer TResponse>
    ? TResponse
    : never;
};

/** How ExecuteMultiple runs its requests (the .NET `ExecuteMultipleSettings`). */
export interface ExecuteMultipleSettings {
  /**
   * Run the remaining requests after one fails (`Prefer: odata.continue-on-error`). Default
   * `false`: Dataverse stops at the first failure, and the requests after it don't run.
   */
  ContinueOnError?: boolean;
  /**
   * Return the response of each request that succeeded. Default `true`; with `false`, `Responses`
   * holds only the failures.
   */
  ReturnResponses?: boolean;
}

/** Parameters of the ExecuteMultiple message. */
export interface ExecuteMultipleRequestParameters<
  TRequests extends ReadonlyArray<Executable<unknown>> = ReadonlyArray<Executable<unknown>>,
> {
  /**
   * The requests, 1 to 1,000: messages, or the classes of the actions and functions packages. They
   * run in order, each on its own: one failing doesn't undo the others (see
   * `ExecuteTransactionRequest` for all or nothing). A request that is a `$batch` itself can't be
   * one of them.
   */
  Requests: TRequests;
  /** How to run them. */
  Settings?: ExecuteMultipleSettings;
}

/** The outcome of one request of an ExecuteMultiple (the .NET `ExecuteMultipleResponseItem`). */
export interface ExecuteMultipleResponseItem<TResponse = unknown> {
  /** The request's position in `Requests`, from 0. */
  RequestIndex: number;
  /** What the request resolves, when it succeeded (and `ReturnResponses` isn't `false`). */
  Response?: TResponse;
  /**
   * Why the request failed: the error executing it alone rejects with, such as
   * `DataverseODataError` with the Dataverse error `code` and `message`.
   */
  Fault?: Error;
}

/** The outcomes of the requests that ran, in request order. */
export type ExecuteMultipleResult<TResponse = unknown> = Array<
  ExecuteMultipleResponseItem<TResponse>
>;

/**
 * ExecuteMultiple request message: runs several requests in one round trip, a `$batch` with one
 * part per request.
 *
 * Unlike `client.execute()` of a single request, a request that fails doesn't reject: it is an
 * item with a `Fault`, and `IsFaulted` is `true`. Requests that didn't run (after a failure,
 * without `ContinueOnError`) have no item.
 *
 * @example
 * ```typescript
 * const response = await client.execute(
 *   new ExecuteMultipleRequest({
 *     Requests: [
 *       new CreateRequest({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "A" } }),
 *       new WhoAmIRequest(),
 *     ],
 *     Settings: { ContinueOnError: true },
 *   })
 * );
 * for (const item of response.Responses) {
 *   if (item.Fault) console.error(item.RequestIndex, item.Fault.message);
 * }
 * ```
 */
export class ExecuteMultipleRequest<
  const TRequests extends ReadonlyArray<Executable<unknown>> = ReadonlyArray<Executable<unknown>>,
>
  extends OrganizationRequest
  implements Executable<ExecuteMultipleResponse<ExecuteResponses<TRequests>[number]>>
{
  declare readonly Parameters: Readonly<ExecuteMultipleRequestParameters<TRequests>>;

  /** A `$batch` that stopped at a failure has that failure's status: `parseResponse` reads it. */
  readonly parsesErrorResponses = true;

  constructor(parameters: ExecuteMultipleRequestParameters<TRequests>) {
    super("ExecuteMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Requests, Settings } = this.Parameters;
    checkRequestCount(Requests.length, "ExecuteMultiple");
    const steps = Requests.map((request, index) => batchStep(request, baseUrl, String(index + 1)));
    return batchRequestInformation(baseUrl, steps, Settings?.ContinueOnError === true);
  }

  async parseResponse(
    response: Response
  ): Promise<ExecuteMultipleResponse<ExecuteResponses<TRequests>[number]>> {
    type TResponse = ExecuteResponses<TRequests>[number];
    const { Requests, Settings } = this.Parameters;
    const items: ExecuteMultipleResult<TResponse> = [];
    // Outside a change set Dataverse answers the parts in request order, one response each.
    for (const part of await readBatch(response)) {
      const RequestIndex = part.batchIndex;
      const request = Requests[RequestIndex] as Executable<TResponse> | undefined;
      if (!request) continue;
      const answer = partResponse(part);
      if (!succeeded(part)) {
        items.push({ RequestIndex, Fault: await parseODataError(answer) });
        continue;
      }
      try {
        const parsed = await request.parseResponse(answer);
        if (Settings?.ReturnResponses !== false) items.push({ RequestIndex, Response: parsed });
      } catch (error) {
        // The request ran, but its response isn't what it expects
        items.push({
          RequestIndex,
          Fault: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }
    return new ExecuteMultipleResponse<TResponse>(items);
  }
}

/**
 * ExecuteMultiple response message: `result` (also `Responses`, as in .NET) holds one item per
 * request that ran, in request order.
 */
export class ExecuteMultipleResponse<TResponse = unknown> extends OrganizationResponse {
  constructor(public result: ExecuteMultipleResult<TResponse>) {
    super("ExecuteMultiple");
  }

  /** The outcome of each request that ran (the .NET `ExecuteMultipleResponse.Responses`). */
  get Responses(): ExecuteMultipleResult<TResponse> {
    return this.result;
  }

  /** Whether a request failed (the .NET `ExecuteMultipleResponse.IsFaulted`). */
  get IsFaulted(): boolean {
    return this.result.some((item) => item.Fault !== undefined);
  }
}
