import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_checkGovernanceAgentPoliciesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_checkGovernanceAgentPolicies action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_checkGovernanceAgentPoliciesResult {
  "@odata.context"?: string;
  msdyn_hasActivePolicy: boolean;
  msdyn_hasBlockingPolicy: boolean;
  msdyn_status: string;
}

/**
 * msdyn_checkGovernanceAgentPolicies response message
 *
 * `result` is the value the msdyn_checkGovernanceAgentPolicies action returns (see {@link msdyn_checkGovernanceAgentPoliciesResult}).
 */
export class msdyn_checkGovernanceAgentPoliciesResponse extends OrganizationResponse {
  constructor(public result: msdyn_checkGovernanceAgentPoliciesResult) {
    super("msdyn_checkGovernanceAgentPolicies");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_checkGovernanceAgentPoliciesResponse {
    return new msdyn_checkGovernanceAgentPoliciesResponse(
      data as msdyn_checkGovernanceAgentPoliciesResult
    );
  }
}
