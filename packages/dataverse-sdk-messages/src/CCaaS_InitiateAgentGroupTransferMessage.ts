import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentGroupTransfer message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentGroupTransferRequestParameters {
  AgentGroupId: string;
  ApiVersion: string;
  IntentId?: string;
  IntentGroupId?: string;
  IntentFamilyId?: string;
}

/**
 * CCaaS_InitiateAgentGroupTransfer request message
 *
 * Web API Action: CCaaS_InitiateAgentGroupTransfer
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentGroupTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentGroupTransferResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentGroupTransferRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentGroupTransferRequestParameters
  ) {
    super("CCaaS_InitiateAgentGroupTransfer", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupTransfer`;

    const body = requestBody({
      AgentGroupId: this.Parameters.AgentGroupId,
      ApiVersion: this.Parameters.ApiVersion,
      IntentId: this.Parameters.IntentId,
      IntentGroupId: this.Parameters.IntentGroupId,
      IntentFamilyId: this.Parameters.IntentFamilyId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupTransferResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentGroupTransferResponse();
  }
}

/**
 * CCaaS_InitiateAgentGroupTransfer response message
 */
export class CCaaS_InitiateAgentGroupTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentGroupTransfer");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentGroupTransferResponse {
    return new CCaaS_InitiateAgentGroupTransferResponse();
  }
}
