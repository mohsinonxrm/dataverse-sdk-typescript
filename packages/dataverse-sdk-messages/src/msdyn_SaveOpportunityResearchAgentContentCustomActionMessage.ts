import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SaveOpportunityResearchAgentContentCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveOpportunityResearchAgentContentCustomActionRequestParameters {
  AgentContent?: string;
}

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction request message
 *
 * Web API Action: msdyn_SaveOpportunityResearchAgentContentCustomAction
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveOpportunityResearchAgentContentCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveOpportunityResearchAgentContentCustomActionRequestParameters>;

  constructor(
    parameters: msdyn_SaveOpportunityResearchAgentContentCustomActionRequestParameters = {}
  ) {
    super("msdyn_SaveOpportunityResearchAgentContentCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchAgentContentCustomAction`;

    const body = requestBody({
      AgentContent: this.Parameters.AgentContent,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SaveOpportunityResearchAgentContentCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SaveOpportunityResearchAgentContentCustomActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SaveOpportunityResearchAgentContentCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveOpportunityResearchAgentContentCustomActionResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Response: string;
  StatusCode: number;
}

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction response message
 *
 * `result` is the value the msdyn_SaveOpportunityResearchAgentContentCustomAction action returns (see {@link msdyn_SaveOpportunityResearchAgentContentCustomActionResult}).
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveOpportunityResearchAgentContentCustomActionResult) {
    super("msdyn_SaveOpportunityResearchAgentContentCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SaveOpportunityResearchAgentContentCustomActionResponse {
    return new msdyn_SaveOpportunityResearchAgentContentCustomActionResponse(
      data as msdyn_SaveOpportunityResearchAgentContentCustomActionResult
    );
  }
}
