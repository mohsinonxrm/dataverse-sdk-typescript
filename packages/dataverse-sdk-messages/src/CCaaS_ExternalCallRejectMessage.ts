import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ExternalCallReject message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ExternalCallRejectRequestParameters {
  ApiVersion: string;
  SessionId: string;
  CallId: string;
  ParticipantId: string;
  ParticipantType: string;
}

/**
 * CCaaS_ExternalCallReject request message
 *
 * Web API Action: CCaaS_ExternalCallReject
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ExternalCallRejectRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ExternalCallRejectResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ExternalCallRejectRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_ExternalCallRejectRequestParameters
  ) {
    super("CCaaS_ExternalCallReject", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ExternalCallReject`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      SessionId: this.Parameters.SessionId,
      CallId: this.Parameters.CallId,
      ParticipantId: this.Parameters.ParticipantId,
      ParticipantType: this.Parameters.ParticipantType,
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

  async parseResponse(response: Response): Promise<CCaaS_ExternalCallRejectResponse> {
    // No return value (204 No Content)
    return new CCaaS_ExternalCallRejectResponse();
  }
}

/**
 * CCaaS_ExternalCallReject response message
 */
export class CCaaS_ExternalCallRejectResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ExternalCallReject");
  }

  static fromResponse(_data: unknown): CCaaS_ExternalCallRejectResponse {
    return new CCaaS_ExternalCallRejectResponse();
  }
}
