import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetTalkingPointsResponse as msdyn_GetTalkingPointsResponseData } from "./types/index.js";

/**
 * msdyn_GetTalkingPoints request message
 *
 * Web API Action: msdyn_GetTalkingPoints
 */
export class msdyn_GetTalkingPointsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTalkingPointsResponse>
{
  constructor(
    public entityId: string,
    public entityType: string
  ) {
    super("msdyn_GetTalkingPoints");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTalkingPoints`;

    const body: Record<string, unknown> = {
      entityId: this.entityId,
      entityType: this.entityType,
    };

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
    const data = await response.json();
    return msdyn_GetTalkingPointsResponse.fromResponse(data);
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
