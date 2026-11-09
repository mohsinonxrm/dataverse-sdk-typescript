import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RetrieveFlowUpdates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFlowUpdatesRequestParameters {
  ObjectId: string;
}

/**
 * RetrieveFlowUpdates request message
 *
 * Web API Action: RetrieveFlowUpdates
 */
export class RetrieveFlowUpdatesRequest
  extends OrganizationRequest
  implements Executable<RetrieveFlowUpdatesResponse>
{
  declare readonly Parameters: Readonly<RetrieveFlowUpdatesRequestParameters>;

  constructor(parameters: RetrieveFlowUpdatesRequestParameters) {
    super("RetrieveFlowUpdates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFlowUpdates`;

    const body = requestBody({
      ObjectId: this.Parameters.ObjectId,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RetrieveFlowUpdatesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveFlowUpdatesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveFlowUpdatesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveFlowUpdates action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveFlowUpdatesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveFlowUpdates response message
 *
 * `result` is the value the RetrieveFlowUpdates action returns (see {@link RetrieveFlowUpdatesResult}).
 */
export class RetrieveFlowUpdatesResponse extends OrganizationResponse {
  constructor(public result: RetrieveFlowUpdatesResult) {
    super("RetrieveFlowUpdates");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFlowUpdatesResponse {
    return new RetrieveFlowUpdatesResponse(
      data === undefined ? [] : (data as { value: RetrieveFlowUpdatesResult }).value
    );
  }
}
