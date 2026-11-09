import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEligibleRegardingEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEligibleRegardingEntitiesRequestParameters {
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetEligibleRegardingEntities request message
 *
 * Web API Action: msdyn_GetEligibleRegardingEntities
 */
export class msdyn_GetEligibleRegardingEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEligibleRegardingEntitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEligibleRegardingEntitiesRequestParameters>;

  constructor(parameters: msdyn_GetEligibleRegardingEntitiesRequestParameters) {
    super("msdyn_GetEligibleRegardingEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEligibleRegardingEntities`;

    const body = requestBody({
      correlationId: this.Parameters.correlationId,
      workflowId: this.Parameters.workflowId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEligibleRegardingEntitiesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_GetEligibleRegardingEntitiesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetEligibleRegardingEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetEligibleRegardingEntities action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetEligibleRegardingEntitiesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetEligibleRegardingEntities response message
 *
 * `result` is the value the msdyn_GetEligibleRegardingEntities action returns (see {@link msdyn_GetEligibleRegardingEntitiesResult}).
 */
export class msdyn_GetEligibleRegardingEntitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEligibleRegardingEntitiesResult) {
    super("msdyn_GetEligibleRegardingEntities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetEligibleRegardingEntitiesResponse {
    return new msdyn_GetEligibleRegardingEntitiesResponse(
      data === undefined ? [] : (data as { value: msdyn_GetEligibleRegardingEntitiesResult }).value
    );
  }
}
