import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_HoldCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_HoldCallRequestParameters {
  ParticipantType: string;
  SessionId: string;
  ConsultWithOrTransferTo: string;
  CallId?: string;
  CommandContext?: string;
  ParticipantId: string;
  ApiVersion: string;
}

/**
 * CCaaS_HoldCall request message
 *
 * Web API Action: CCaaS_HoldCall
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_HoldCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_HoldCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_HoldCallRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_HoldCallRequestParameters
  ) {
    super("CCaaS_HoldCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_HoldCall`;

    const body = requestBody({
      ParticipantType: this.Parameters.ParticipantType,
      SessionId: this.Parameters.SessionId,
      ConsultWithOrTransferTo: this.Parameters.ConsultWithOrTransferTo,
      CallId: this.Parameters.CallId,
      CommandContext: this.Parameters.CommandContext,
      ParticipantId: this.Parameters.ParticipantId,
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

  async parseResponse(response: Response): Promise<CCaaS_HoldCallResponse> {
    // No return value (204 No Content)
    return new CCaaS_HoldCallResponse();
  }
}

/**
 * CCaaS_HoldCall response message
 */
export class CCaaS_HoldCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_HoldCall");
  }

  static fromResponse(_data: unknown): CCaaS_HoldCallResponse {
    return new CCaaS_HoldCallResponse();
  }
}
