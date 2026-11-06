import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CloseExternalSession message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CloseExternalSessionRequestParameters {
  ParticipantType: string;
  ApiVersion: string;
  CommandContext?: string;
  ParticipantId: string;
  CallId?: string;
  SessionId: string;
}

/**
 * CCaaS_CloseExternalSession request message
 *
 * Web API Action: CCaaS_CloseExternalSession
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_CloseExternalSessionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CloseExternalSessionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CloseExternalSessionRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_CloseExternalSessionRequestParameters
  ) {
    super("CCaaS_CloseExternalSession", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_CloseExternalSession`;

    const body = requestBody({
      ParticipantType: this.Parameters.ParticipantType,
      ApiVersion: this.Parameters.ApiVersion,
      CommandContext: this.Parameters.CommandContext,
      ParticipantId: this.Parameters.ParticipantId,
      CallId: this.Parameters.CallId,
      SessionId: this.Parameters.SessionId,
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

  parseResponse(_response: Response): Promise<CCaaS_CloseExternalSessionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_CloseExternalSessionResponse());
  }
}

/**
 * CCaaS_CloseExternalSession response message
 */
export class CCaaS_CloseExternalSessionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CloseExternalSession");
  }

  static fromResponse(_data?: unknown): CCaaS_CloseExternalSessionResponse {
    return new CCaaS_CloseExternalSessionResponse();
  }
}
