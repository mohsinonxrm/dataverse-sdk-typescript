import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_UnholdCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_UnholdCallRequestParameters {
  SessionId: string;
  ParticipantId: string;
  CommandContext?: string;
  ApiVersion: string;
  ParticipantType: string;
  CallId?: string;
  ConsultWithOrTransferTo: string;
}

/**
 * CCaaS_UnholdCall request message
 *
 * Web API Action: CCaaS_UnholdCall
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_UnholdCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_UnholdCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_UnholdCallRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_UnholdCallRequestParameters
  ) {
    super("CCaaS_UnholdCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_UnholdCall`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      ParticipantId: this.Parameters.ParticipantId,
      CommandContext: this.Parameters.CommandContext,
      ApiVersion: this.Parameters.ApiVersion,
      ParticipantType: this.Parameters.ParticipantType,
      CallId: this.Parameters.CallId,
      ConsultWithOrTransferTo: this.Parameters.ConsultWithOrTransferTo,
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

  parseResponse(_response: Response): Promise<CCaaS_UnholdCallResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_UnholdCallResponse());
  }
}

/**
 * CCaaS_UnholdCall response message
 */
export class CCaaS_UnholdCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_UnholdCall");
  }

  static fromResponse(_data?: unknown): CCaaS_UnholdCallResponse {
    return new CCaaS_UnholdCallResponse();
  }
}
