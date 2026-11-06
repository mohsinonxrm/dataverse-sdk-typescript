import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAgentCoachEnabledResponse as msdyn_GetAgentCoachEnabledResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAgentCoachEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentCoachEnabledRequestParameters {
  msdyn_RecordType: string;
}

/**
 * msdyn_GetAgentCoachEnabled request message
 *
 * Web API Action: msdyn_GetAgentCoachEnabled
 */
export class msdyn_GetAgentCoachEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAgentCoachEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAgentCoachEnabledRequestParameters>;

  constructor(parameters: msdyn_GetAgentCoachEnabledRequestParameters) {
    super("msdyn_GetAgentCoachEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentCoachEnabled`;

    const body = requestBody({
      msdyn_RecordType: this.Parameters.msdyn_RecordType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentCoachEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAgentCoachEnabledResponse.fromResponse({});
    return msdyn_GetAgentCoachEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAgentCoachEnabled response message
 */
export class msdyn_GetAgentCoachEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAgentCoachEnabledResponseData) {
    super("msdyn_GetAgentCoachEnabled");
  }

  static fromResponse(data: unknown): msdyn_GetAgentCoachEnabledResponse {
    return new msdyn_GetAgentCoachEnabledResponse(
      responseObject<msdyn_GetAgentCoachEnabledResponseData>(data)
    );
  }
}
