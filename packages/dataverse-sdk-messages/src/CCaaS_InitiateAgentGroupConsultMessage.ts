import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentGroupConsult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentGroupConsultRequestParameters {
  IntentId: string;
  AgentGroupId?: string;
  IntentFamilyId: string;
  ApiVersion: string;
  IntentGroupId: string;
  ConversationAccess: string;
  ConsultType: string;
}

/**
 * CCaaS_InitiateAgentGroupConsult request message
 *
 * Web API Action: CCaaS_InitiateAgentGroupConsult
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentGroupConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentGroupConsultResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentGroupConsultRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentGroupConsultRequestParameters
  ) {
    super("CCaaS_InitiateAgentGroupConsult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupConsult`;

    const body = requestBody({
      IntentId: this.Parameters.IntentId,
      AgentGroupId: this.Parameters.AgentGroupId,
      IntentFamilyId: this.Parameters.IntentFamilyId,
      ApiVersion: this.Parameters.ApiVersion,
      IntentGroupId: this.Parameters.IntentGroupId,
      ConversationAccess: this.Parameters.ConversationAccess,
      ConsultType: this.Parameters.ConsultType,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentGroupConsultResponse();
  }
}

/**
 * CCaaS_InitiateAgentGroupConsult response message
 */
export class CCaaS_InitiateAgentGroupConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentGroupConsult");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentGroupConsultResponse {
    return new CCaaS_InitiateAgentGroupConsultResponse();
  }
}
