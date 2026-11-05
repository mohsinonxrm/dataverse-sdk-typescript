import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentGroupAssignment request message
 *
 * Web API Action: CCaaS_InitiateAgentGroupAssignment
 */
export class CCaaS_InitiateAgentGroupAssignmentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentGroupAssignmentResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public agentGroupId: string,
    public apiVersion: string
  ) {
    super("CCaaS_InitiateAgentGroupAssignment");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupAssignment`;

    const body: Record<string, unknown> = {
      AgentGroupId: this.agentGroupId,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupAssignmentResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentGroupAssignmentResponse();
  }
}

/**
 * CCaaS_InitiateAgentGroupAssignment response message
 */
export class CCaaS_InitiateAgentGroupAssignmentResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentGroupAssignment");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentGroupAssignmentResponse {
    return new CCaaS_InitiateAgentGroupAssignmentResponse();
  }
}
