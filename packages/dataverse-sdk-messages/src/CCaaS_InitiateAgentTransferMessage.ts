import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentTransfer message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentTransferRequestParameters {
  ApiVersion: string;
  QueueId?: string;
  AgentId: string;
}

/**
 * CCaaS_InitiateAgentTransfer request message
 *
 * Web API Action: CCaaS_InitiateAgentTransfer
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentTransferResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentTransferRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentTransferRequestParameters
  ) {
    super("CCaaS_InitiateAgentTransfer", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransfer`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      QueueId: this.Parameters.QueueId,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateAgentTransferResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_InitiateAgentTransferResponse());
  }
}

/**
 * CCaaS_InitiateAgentTransfer response message
 */
export class CCaaS_InitiateAgentTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentTransfer");
  }

  static fromResponse(_data?: unknown): CCaaS_InitiateAgentTransferResponse {
    return new CCaaS_InitiateAgentTransferResponse();
  }
}
