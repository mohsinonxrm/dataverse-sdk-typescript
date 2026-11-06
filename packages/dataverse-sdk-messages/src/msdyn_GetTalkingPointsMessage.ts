import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetTalkingPointsResponse as msdyn_GetTalkingPointsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetTalkingPointsResponse.fromResponse({});
    return msdyn_GetTalkingPointsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetTalkingPoints response message
 */
export class msdyn_GetTalkingPointsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTalkingPointsResponseData) {
    super("msdyn_GetTalkingPoints");
  }

  static fromResponse(data: unknown): msdyn_GetTalkingPointsResponse {
    return new msdyn_GetTalkingPointsResponse(
      responseObject<msdyn_GetTalkingPointsResponseData>(data)
    );
  }
}
