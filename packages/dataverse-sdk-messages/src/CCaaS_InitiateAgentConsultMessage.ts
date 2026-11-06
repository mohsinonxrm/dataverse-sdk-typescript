import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentConsult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentConsultRequestParameters {
  ConsultType: string;
  ParticipantType?: string;
  ApiVersion: string;
  QueueId: string;
  AgentId: string;
  ConversationAccess: string;
}

/**
 * CCaaS_InitiateAgentConsult request message
 *
 * Web API Action: CCaaS_InitiateAgentConsult
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentConsultResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentConsultRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentConsultRequestParameters
  ) {
    super("CCaaS_InitiateAgentConsult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentConsult`;

    const body = requestBody({
      ConsultType: this.Parameters.ConsultType,
      ParticipantType: this.Parameters.ParticipantType,
      ApiVersion: this.Parameters.ApiVersion,
      QueueId: this.Parameters.QueueId,
      AgentId: this.Parameters.AgentId,
      ConversationAccess: this.Parameters.ConversationAccess,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentConsultResponse();
  }
}

/**
 * CCaaS_InitiateAgentConsult response message
 */
export class CCaaS_InitiateAgentConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentConsult");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentConsultResponse {
    return new CCaaS_InitiateAgentConsultResponse();
  }
}
