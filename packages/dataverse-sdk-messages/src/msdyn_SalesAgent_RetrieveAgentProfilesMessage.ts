import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgent_RetrieveAgentProfilesResponse as msdyn_SalesAgent_RetrieveAgentProfilesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgent_RetrieveAgentProfiles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_RetrieveAgentProfilesRequestParameters {
  FeatureName?: string;
}

/**
 * msdyn_SalesAgent_RetrieveAgentProfiles request message
 *
 * Web API Action: msdyn_SalesAgent_RetrieveAgentProfiles
 */
export class msdyn_SalesAgent_RetrieveAgentProfilesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgent_RetrieveAgentProfilesResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgent_RetrieveAgentProfilesRequestParameters>;

  constructor(parameters: msdyn_SalesAgent_RetrieveAgentProfilesRequestParameters = {}) {
    super("msdyn_SalesAgent_RetrieveAgentProfiles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_RetrieveAgentProfiles`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_RetrieveAgentProfilesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgent_RetrieveAgentProfilesResponse.fromResponse({});
    return msdyn_SalesAgent_RetrieveAgentProfilesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgent_RetrieveAgentProfiles response message
 */
export class msdyn_SalesAgent_RetrieveAgentProfilesResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_RetrieveAgentProfilesResponseData) {
    super("msdyn_SalesAgent_RetrieveAgentProfiles");
  }

  static fromResponse(data: unknown): msdyn_SalesAgent_RetrieveAgentProfilesResponse {
    return new msdyn_SalesAgent_RetrieveAgentProfilesResponse(
      responseObject<msdyn_SalesAgent_RetrieveAgentProfilesResponseData>(data)
    );
  }
}
