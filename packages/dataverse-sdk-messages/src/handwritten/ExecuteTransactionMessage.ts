/**
 * ExecuteTransaction message (#344). Hand-written: the Web API has no ExecuteTransaction action;
 * the requests are sent as one `$batch` change set, which Dataverse runs as one transaction.
 */
import {
  DataverseInvalidRequestError,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import type { ExecuteResponses } from "./ExecuteMultipleMessage.js";
import {
  batchRequestInformation,
  batchStep,
  changesetParts,
  checkRequestCount,
  partResponse,
} from "./internal.js";

/** Parameters of the ExecuteTransaction message. */
export interface ExecuteTransactionRequestParameters<
  TRequests extends ReadonlyArray<Executable<unknown>> = ReadonlyArray<Executable<unknown>>,
> {
  /**
   * The requests, 1 to 1,000, that run in order in one transaction: all of them succeed, or none
   * of them has an effect. Messages, or the classes of the actions package: a change set can't
   * hold a `GET`, so functions (and Retrieve, RetrieveMultiple) can't be in it; use
   * `ExecuteMultipleRequest` for those. A request that is a `$batch` itself can't be one of them.
   */
  Requests: TRequests;
}

/**
 * ExecuteTransaction request message: runs several requests that change data as one transaction,
 * a `$batch` change set.
 *
 * When a request fails, the transaction is rolled back and `client.execute()` rejects with that
 * request's error (such as `DataverseODataError` with the Dataverse error `code`), as executing
 * the request alone would. The responses are always returned (the .NET `ReturnResponses` isn't
 * needed).
 *
 * @example
 * ```typescript
 * const response = await client.execute(
 *   new ExecuteTransactionRequest({
 *     Requests: [
 *       new CreateRequest({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "A" } }),
 *       new CreateRequest({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "B" } }),
 *     ],
 *   })
 * );
 * const [first, second] = response.Responses; // CreateResponse, CreateResponse
 * ```
 */
export class ExecuteTransactionRequest<
  const TRequests extends ReadonlyArray<Executable<unknown>> = ReadonlyArray<Executable<unknown>>,
>
  extends OrganizationRequest
  implements Executable<ExecuteTransactionResponse<ExecuteResponses<TRequests>>>
{
  declare readonly Parameters: Readonly<ExecuteTransactionRequestParameters<TRequests>>;

  /** A failed change set has the failure's status: `parseResponse` reads it. */
  readonly parsesErrorResponses = true;

  constructor(parameters: ExecuteTransactionRequestParameters<TRequests>) {
    super("ExecuteTransaction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Requests } = this.Parameters;
    checkRequestCount(Requests.length, "ExecuteTransaction");
    const steps = Requests.map((request, index) => {
      const step = batchStep(request, baseUrl, String(index + 1));
      if (step.method === "GET") {
        throw DataverseInvalidRequestError.invalidParameter(
          "Requests",
          `request ${step.id} is a GET, which a transaction (a $batch change set) can't hold; ` +
            "use ExecuteMultipleRequest"
        );
      }
      return step;
    });
    return batchRequestInformation(baseUrl, [{ changeset: steps }]);
  }

  async parseResponse(
    response: Response
  ): Promise<ExecuteTransactionResponse<ExecuteResponses<TRequests>>> {
    const { Requests } = this.Parameters;
    const parts = await changesetParts(response, Requests.length);
    const responses: unknown[] = [];
    for (const [index, part] of parts.entries()) {
      responses.push(await Requests[index].parseResponse(partResponse(part)));
    }
    return new ExecuteTransactionResponse(responses as ExecuteResponses<TRequests>);
  }
}

/**
 * ExecuteTransaction response message: `result` (also `Responses`, as in .NET) holds what each
 * request resolves, in request order.
 */
export class ExecuteTransactionResponse<
  TResponses extends readonly unknown[] = unknown[],
> extends OrganizationResponse {
  constructor(public result: TResponses) {
    super("ExecuteTransaction");
  }

  /** What each request resolves (the .NET `ExecuteTransactionResponse.Responses`). */
  get Responses(): TResponses {
    return this.result;
  }
}
