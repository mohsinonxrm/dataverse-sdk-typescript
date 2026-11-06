import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SaveOpportunityResearchAgentContentCustomActionResponse as msdyn_SaveOpportunityResearchAgentContentCustomActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SaveOpportunityResearchAgentContentCustomActionResponse.fromResponse({});
    return msdyn_SaveOpportunityResearchAgentContentCustomActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction response message
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveOpportunityResearchAgentContentCustomActionResponseData) {
    super("msdyn_SaveOpportunityResearchAgentContentCustomAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SaveOpportunityResearchAgentContentCustomActionResponse {
    return new msdyn_SaveOpportunityResearchAgentContentCustomActionResponse(
      responseObject<msdyn_SaveOpportunityResearchAgentContentCustomActionResponseData>(data)
    );
  }
}
