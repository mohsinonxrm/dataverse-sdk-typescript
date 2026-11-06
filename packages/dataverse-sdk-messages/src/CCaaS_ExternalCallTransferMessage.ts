import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ExternalCallTransfer message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ExternalCallTransferRequestParameters {
  CallId: string;
  ApiVersion: string;
  SessionId: string;
  ParticipantType: string;
  ParticipantId: string;
}

/**
 * CCaaS_ExternalCallTransfer request message
 *
 * Web API Action: CCaaS_ExternalCallTransfer
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ExternalCallTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ExternalCallTransferResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ExternalCallTransferRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_ExternalCallTransferRequestParameters
  ) {
    super("CCaaS_ExternalCallTransfer", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ExternalCallTransfer`;

    const body = requestBody({
      CallId: this.Parameters.CallId,
      ApiVersion: this.Parameters.ApiVersion,
      SessionId: this.Parameters.SessionId,
      ParticipantType: this.Parameters.ParticipantType,
      ParticipantId: this.Parameters.ParticipantId,
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

  async parseResponse(response: Response): Promise<CCaaS_ExternalCallTransferResponse> {
    // No return value (204 No Content)
    return new CCaaS_ExternalCallTransferResponse();
  }
}

/**
 * CCaaS_ExternalCallTransfer response message
 */
export class CCaaS_ExternalCallTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ExternalCallTransfer");
  }

  static fromResponse(_data: unknown): CCaaS_ExternalCallTransferResponse {
    return new CCaaS_ExternalCallTransferResponse();
  }
}
