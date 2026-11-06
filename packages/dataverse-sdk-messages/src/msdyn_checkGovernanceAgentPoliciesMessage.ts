import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_checkGovernanceAgentPoliciesResponse as msdyn_checkGovernanceAgentPoliciesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_checkGovernanceAgentPolicies message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_checkGovernanceAgentPoliciesRequestParameters {
  msdyn_scenarioname: string;
  msdyn_channel: number;
}

/**
 * msdyn_checkGovernanceAgentPolicies request message
 *
 * Web API Action: msdyn_checkGovernanceAgentPolicies
 */
export class msdyn_checkGovernanceAgentPoliciesRequest
  extends OrganizationRequest
  implements Executable<msdyn_checkGovernanceAgentPoliciesResponse>
{
  declare readonly Parameters: Readonly<msdyn_checkGovernanceAgentPoliciesRequestParameters>;

  constructor(parameters: msdyn_checkGovernanceAgentPoliciesRequestParameters) {
    super("msdyn_checkGovernanceAgentPolicies", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_checkGovernanceAgentPolicies`;

    const body = requestBody({
      msdyn_scenarioname: this.Parameters.msdyn_scenarioname,
      msdyn_channel: this.Parameters.msdyn_channel,
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

  async parseResponse(response: Response): Promise<msdyn_checkGovernanceAgentPoliciesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_checkGovernanceAgentPoliciesResponse.fromResponse({});
    return msdyn_checkGovernanceAgentPoliciesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_checkGovernanceAgentPolicies response message
 */
export class msdyn_checkGovernanceAgentPoliciesResponse extends OrganizationResponse {
  constructor(public result: msdyn_checkGovernanceAgentPoliciesResponseData) {
    super("msdyn_checkGovernanceAgentPolicies");
  }

  static fromResponse(data: unknown): msdyn_checkGovernanceAgentPoliciesResponse {
    return new msdyn_checkGovernanceAgentPoliciesResponse(
      responseObject<msdyn_checkGovernanceAgentPoliciesResponseData>(data)
    );
  }
}
