import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateExternalTransfer message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateExternalTransferRequestParameters {
  ParticipantType: string;
  ParticipantId: string;
  CallId: string;
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateExternalTransfer request message
 *
 * Web API Action: CCaaS_InitiateExternalTransfer
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateExternalTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateExternalTransferResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateExternalTransferRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateExternalTransferRequestParameters
  ) {
    super("CCaaS_InitiateExternalTransfer", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateExternalTransfer`;

    const body = requestBody({
      ParticipantType: this.Parameters.ParticipantType,
      ParticipantId: this.Parameters.ParticipantId,
      CallId: this.Parameters.CallId,
      SessionId: this.Parameters.SessionId,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateExternalTransferResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_InitiateExternalTransferResponse());
  }
}

/**
 * CCaaS_InitiateExternalTransfer response message
 */
export class CCaaS_InitiateExternalTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateExternalTransfer");
  }

  static fromResponse(_data?: unknown): CCaaS_InitiateExternalTransferResponse {
    return new CCaaS_InitiateExternalTransferResponse();
  }
}
