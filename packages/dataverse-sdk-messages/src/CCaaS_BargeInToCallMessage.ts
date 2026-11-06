import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_BargeInToCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BargeInToCallRequestParameters {
  ApiVersion: string;
  SessionId: string;
  ParticipantType: string;
  ParticipantId: string;
  CallId: string;
}

/**
 * CCaaS_BargeInToCall request message
 *
 * Web API Action: CCaaS_BargeInToCall
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_BargeInToCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BargeInToCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_BargeInToCallRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_BargeInToCallRequestParameters
  ) {
    super("CCaaS_BargeInToCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_BargeInToCall`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      SessionId: this.Parameters.SessionId,
      ParticipantType: this.Parameters.ParticipantType,
      ParticipantId: this.Parameters.ParticipantId,
      CallId: this.Parameters.CallId,
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

  async parseResponse(response: Response): Promise<CCaaS_BargeInToCallResponse> {
    // No return value (204 No Content)
    return new CCaaS_BargeInToCallResponse();
  }
}

/**
 * CCaaS_BargeInToCall response message
 */
export class CCaaS_BargeInToCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_BargeInToCall");
  }

  static fromResponse(_data: unknown): CCaaS_BargeInToCallResponse {
    return new CCaaS_BargeInToCallResponse();
  }
}
