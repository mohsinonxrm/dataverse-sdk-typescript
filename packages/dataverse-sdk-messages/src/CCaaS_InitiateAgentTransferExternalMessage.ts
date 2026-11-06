import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentTransferExternal message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentTransferExternalRequestParameters {
  ExternalParticipantChannel: string;
  ExternalParticipantChannelType: string;
  AgentName?: string;
  ExternalReferenceId?: string;
  ExternalReferenceType?: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateAgentTransferExternal request message
 *
 * Web API Action: CCaaS_InitiateAgentTransferExternal
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentTransferExternalRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentTransferExternalResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentTransferExternalRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentTransferExternalRequestParameters
  ) {
    super("CCaaS_InitiateAgentTransferExternal", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentTransferExternal`;

    const body = requestBody({
      ExternalParticipantChannel: this.Parameters.ExternalParticipantChannel,
      ExternalParticipantChannelType: this.Parameters.ExternalParticipantChannelType,
      AgentName: this.Parameters.AgentName,
      ExternalReferenceId: this.Parameters.ExternalReferenceId,
      ExternalReferenceType: this.Parameters.ExternalReferenceType,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentTransferExternalResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentTransferExternalResponse();
  }
}

/**
 * CCaaS_InitiateAgentTransferExternal response message
 */
export class CCaaS_InitiateAgentTransferExternalResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentTransferExternal");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentTransferExternalResponse {
    return new CCaaS_InitiateAgentTransferExternalResponse();
  }
}
