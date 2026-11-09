import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_CreateSARRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARRecordsRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_InputPayload: string;
}

/**
 * msdyn_SalesAgents_CreateSARRecords request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARRecords
 */
export class msdyn_SalesAgents_CreateSARRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_CreateSARRecordsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_CreateSARRecordsRequestParameters) {
    super("msdyn_SalesAgents_CreateSARRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecords`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_InputPayload: this.Parameters.msdyn_InputPayload,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_CreateSARRecordsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_SalesAgents_CreateSARRecordsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_SalesAgents_CreateSARRecordsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_CreateSARRecords action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_SalesAgents_CreateSARRecordsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_SalesAgents_CreateSARRecords response message
 *
 * `result` is the value the msdyn_SalesAgents_CreateSARRecords action returns (see {@link msdyn_SalesAgents_CreateSARRecordsResult}).
 */
export class msdyn_SalesAgents_CreateSARRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_CreateSARRecordsResult) {
    super("msdyn_SalesAgents_CreateSARRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_CreateSARRecordsResponse {
    return new msdyn_SalesAgents_CreateSARRecordsResponse(
      data === undefined ? [] : (data as { value: msdyn_SalesAgents_CreateSARRecordsResult }).value
    );
  }
}
