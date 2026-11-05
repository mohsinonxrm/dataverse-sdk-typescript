import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateAgentTransfer request message
 *
 * Web API Action: CCaaS_InitiateAgentTransfer
 */
export class CCaaS_InitiateAgentTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentTransferResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public agentId: string,
    public apiVersion: string,
    public queueId: string
  ) {
    super("CCaaS_InitiateAgentTransfer");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransfer`;

    const body: Record<string, unknown> = {
      AgentId: this.agentId,
      ApiVersion: this.apiVersion,
      QueueId: this.queueId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentTransferResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentTransferResponse();
  }
}

/**
 * CCaaS_InitiateAgentTransfer response message
 */
export class CCaaS_InitiateAgentTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentTransfer");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentTransferResponse {
    return new CCaaS_InitiateAgentTransferResponse();
  }
}
