import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_RejectExternalTransfer message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RejectExternalTransferRequestParameters {
  ParticipantId: string;
  CallId?: string;
  CommandContext?: string;
  ParticipantType: string;
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_RejectExternalTransfer request message
 *
 * Web API Action: CCaaS_RejectExternalTransfer
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RejectExternalTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_RejectExternalTransferResponse>
{
  declare readonly Parameters: Readonly<CCaaS_RejectExternalTransferRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_RejectExternalTransferRequestParameters
  ) {
    super("CCaaS_RejectExternalTransfer", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejectExternalTransfer`;

    const body = requestBody({
      ParticipantId: this.Parameters.ParticipantId,
      CallId: this.Parameters.CallId,
      CommandContext: this.Parameters.CommandContext,
      ParticipantType: this.Parameters.ParticipantType,
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

  parseResponse(_response: Response): Promise<CCaaS_RejectExternalTransferResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_RejectExternalTransferResponse());
  }
}

/**
 * CCaaS_RejectExternalTransfer response message
 */
export class CCaaS_RejectExternalTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_RejectExternalTransfer");
  }

  static fromResponse(_data?: unknown): CCaaS_RejectExternalTransferResponse {
    return new CCaaS_RejectExternalTransferResponse();
  }
}
