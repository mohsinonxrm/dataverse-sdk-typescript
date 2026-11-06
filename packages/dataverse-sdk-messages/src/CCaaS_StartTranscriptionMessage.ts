import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_StartTranscription message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartTranscriptionRequestParameters {
  SessionId: string;
  CommandContext?: string;
  ConsultWithOrTransferTo: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_StartTranscription request message
 *
 * Web API Action: CCaaS_StartTranscription
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StartTranscriptionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_StartTranscriptionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_StartTranscriptionRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_StartTranscriptionRequestParameters
  ) {
    super("CCaaS_StartTranscription", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StartTranscription`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      CommandContext: this.Parameters.CommandContext,
      ConsultWithOrTransferTo: this.Parameters.ConsultWithOrTransferTo,
      CallId: this.Parameters.CallId,
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

  parseResponse(_response: Response): Promise<CCaaS_StartTranscriptionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_StartTranscriptionResponse());
  }
}

/**
 * CCaaS_StartTranscription response message
 */
export class CCaaS_StartTranscriptionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_StartTranscription");
  }

  static fromResponse(_data?: unknown): CCaaS_StartTranscriptionResponse {
    return new CCaaS_StartTranscriptionResponse();
  }
}
