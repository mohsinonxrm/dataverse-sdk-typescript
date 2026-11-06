import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentTransferBySupervisor message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentTransferBySupervisorRequestParameters {
  ApiVersion: string;
  AgentId: string;
}

/**
 * CCaaS_InitiateAgentTransferBySupervisor request message
 *
 * Web API Action: CCaaS_InitiateAgentTransferBySupervisor
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentTransferBySupervisorRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentTransferBySupervisorResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentTransferBySupervisorRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentTransferBySupervisorRequestParameters
  ) {
    super("CCaaS_InitiateAgentTransferBySupervisor", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransferBySupervisor`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      AgentId: this.Parameters.AgentId,
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
  ): Promise<CCaaS_InitiateAgentTransferBySupervisorResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentTransferBySupervisorResponse();
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
