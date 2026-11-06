import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetRefreshFrequencyResponse as msdyn_SalesAgents_GetRefreshFrequencyResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_GetRefreshFrequency message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetRefreshFrequencyRequestParameters {
  ProfileId: string;
}

/**
 * msdyn_SalesAgents_GetRefreshFrequency request message
 *
 * Web API Action: msdyn_SalesAgents_GetRefreshFrequency
 */
export class msdyn_SalesAgents_GetRefreshFrequencyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetRefreshFrequencyResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetRefreshFrequencyRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetRefreshFrequencyRequestParameters) {
    super("msdyn_SalesAgents_GetRefreshFrequency", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetRefreshFrequency`;

    const body = requestBody({
      ProfileId: this.Parameters.ProfileId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetRefreshFrequencyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetRefreshFrequencyResponse.fromResponse({});
    return msdyn_SalesAgents_GetRefreshFrequencyResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_GetRefreshFrequency response message
 */
export class msdyn_SalesAgents_GetRefreshFrequencyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetRefreshFrequencyResponseData) {
    super("msdyn_SalesAgents_GetRefreshFrequency");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetRefreshFrequencyResponse {
    return new msdyn_SalesAgents_GetRefreshFrequencyResponse(
      responseObject<msdyn_SalesAgents_GetRefreshFrequencyResponseData>(data)
    );
  }
}
