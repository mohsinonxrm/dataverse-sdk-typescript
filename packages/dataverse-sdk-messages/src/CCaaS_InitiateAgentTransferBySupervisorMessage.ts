import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentTransferBySupervisor request message
 *
 * Web API Action: CCaaS_InitiateAgentTransferBySupervisor
 */
export class CCaaS_InitiateAgentTransferBySupervisorRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentTransferBySupervisorResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public agentId: string,
    public apiVersion: string
  ) {
    super("CCaaS_InitiateAgentTransferBySupervisor");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransferBySupervisor`;

    const body: Record<string, unknown> = {
      AgentId: this.agentId,
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_InitiateAgentTransferBySupervisorResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentTransferBySupervisorResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_InitiateAgentTransferBySupervisor response message
 */
export class CCaaS_InitiateAgentTransferBySupervisorResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentTransferBySupervisor");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentTransferBySupervisorResponse {
    return new CCaaS_InitiateAgentTransferBySupervisorResponse();
  }
}
