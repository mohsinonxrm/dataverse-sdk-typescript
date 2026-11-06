import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAgentCoachingResponse as msdyn_GetAgentCoachingResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAgentCoaching message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentCoachingRequestParameters {
  msdyn_RecordType: string;
  msdyn_RegardingId: string;
}

/**
 * msdyn_GetAgentCoaching request message
 *
 * Web API Action: msdyn_GetAgentCoaching
 */
export class msdyn_GetAgentCoachingRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAgentCoachingResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAgentCoachingRequestParameters>;

  constructor(parameters: msdyn_GetAgentCoachingRequestParameters) {
    super("msdyn_GetAgentCoaching", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentCoaching`;

    const body = requestBody({
      msdyn_RecordType: this.Parameters.msdyn_RecordType,
      msdyn_RegardingId: this.Parameters.msdyn_RegardingId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentCoachingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAgentCoachingResponse.fromResponse({});
    return msdyn_GetAgentCoachingResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAgentCoaching response message
 */
export class msdyn_GetAgentCoachingResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAgentCoachingResponseData) {
    super("msdyn_GetAgentCoaching");
  }

  static fromResponse(data: unknown): msdyn_GetAgentCoachingResponse {
    return new msdyn_GetAgentCoachingResponse(
      responseObject<msdyn_GetAgentCoachingResponseData>(data)
    );
  }
}
