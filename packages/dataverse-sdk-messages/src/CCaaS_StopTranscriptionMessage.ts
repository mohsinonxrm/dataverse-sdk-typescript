import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_StopTranscription message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StopTranscriptionRequestParameters {
  CallId?: string;
  CommandContext?: string;
  ConsultWithOrTransferTo: string;
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_StopTranscription request message
 *
 * Web API Action: CCaaS_StopTranscription
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StopTranscriptionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_StopTranscriptionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_StopTranscriptionRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_StopTranscriptionRequestParameters
  ) {
    super("CCaaS_StopTranscription", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StopTranscription`;

    const body = requestBody({
      CallId: this.Parameters.CallId,
      CommandContext: this.Parameters.CommandContext,
      ConsultWithOrTransferTo: this.Parameters.ConsultWithOrTransferTo,
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

  parseResponse(_response: Response): Promise<CCaaS_StopTranscriptionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_StopTranscriptionResponse());
  }
}

/**
 * CCaaS_StopTranscription response message
 */
export class CCaaS_StopTranscriptionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_StopTranscription");
  }

  static fromResponse(_data?: unknown): CCaaS_StopTranscriptionResponse {
    return new CCaaS_StopTranscriptionResponse();
  }
}
