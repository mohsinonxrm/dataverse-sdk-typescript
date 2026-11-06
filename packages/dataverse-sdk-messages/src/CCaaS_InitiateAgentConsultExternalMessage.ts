import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentConsultExternal message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentConsultExternalRequestParameters {
  ExternalReferenceType?: string;
  ExternalParticipantChannel: string;
  ApiVersion: string;
  QueueId: string;
  ExternalReferenceId?: string;
  ConsultType: string;
  ExternalParticipantChannelType: string;
  AgentName?: string;
  ConversationAccess: string;
}

/**
 * CCaaS_InitiateAgentConsultExternal request message
 *
 * Web API Action: CCaaS_InitiateAgentConsultExternal
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentConsultExternalRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentConsultExternalResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentConsultExternalRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentConsultExternalRequestParameters
  ) {
    super("CCaaS_InitiateAgentConsultExternal", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentConsultExternal`;

    const body = requestBody({
      ExternalReferenceType: this.Parameters.ExternalReferenceType,
      ExternalParticipantChannel: this.Parameters.ExternalParticipantChannel,
      ApiVersion: this.Parameters.ApiVersion,
      QueueId: this.Parameters.QueueId,
      ExternalReferenceId: this.Parameters.ExternalReferenceId,
      ConsultType: this.Parameters.ConsultType,
      ExternalParticipantChannelType: this.Parameters.ExternalParticipantChannelType,
      AgentName: this.Parameters.AgentName,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentConsultExternalResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentConsultExternalResponse();
  }
}

/**
 * CCaaS_InitiateAgentConsultExternal response message
 */
export class CCaaS_InitiateAgentConsultExternalResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentConsultExternal");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentConsultExternalResponse {
    return new CCaaS_InitiateAgentConsultExternalResponse();
  }
}
