import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetTalkingPoints message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTalkingPointsRequestParameters {
  entityId: string;
  entityType: string;
}

/**
 * msdyn_GetTalkingPoints request message
 *
 * Web API Action: msdyn_GetTalkingPoints
 */
export class msdyn_GetTalkingPointsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTalkingPointsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetTalkingPointsRequestParameters>;

  constructor(parameters: msdyn_GetTalkingPointsRequestParameters) {
    super("msdyn_GetTalkingPoints", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTalkingPoints`;

    const body = requestBody({
      entityId: this.Parameters.entityId,
      entityType: this.Parameters.entityType,
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

  async parseResponse(response: Response): Promise<msdyn_GetTalkingPointsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetTalkingPointsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetTalkingPoints action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetTalkingPointsResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_GetTalkingPoints response message
 *
 * `result` is the value the msdyn_GetTalkingPoints action returns (see {@link msdyn_GetTalkingPointsResult}).
 */
export class msdyn_GetTalkingPointsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTalkingPointsResult) {
    super("msdyn_GetTalkingPoints");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetTalkingPointsResponse {
    return new msdyn_GetTalkingPointsResponse(data as msdyn_GetTalkingPointsResult);
  }
}
