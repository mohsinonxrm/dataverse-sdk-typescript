import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_PauseRecordingAndTranscription message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_PauseRecordingAndTranscriptionRequestParameters {
  CommandContext?: string;
  SessionId: string;
  CallId?: string;
  ConsultWithOrTransferTo: string;
  ApiVersion: string;
}

/**
 * CCaaS_PauseRecordingAndTranscription request message
 *
 * Web API Action: CCaaS_PauseRecordingAndTranscription
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_PauseRecordingAndTranscriptionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_PauseRecordingAndTranscriptionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_PauseRecordingAndTranscriptionRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_PauseRecordingAndTranscriptionRequestParameters
  ) {
    super("CCaaS_PauseRecordingAndTranscription", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_PauseRecordingAndTranscription`;

    const body = requestBody({
      CommandContext: this.Parameters.CommandContext,
      SessionId: this.Parameters.SessionId,
      CallId: this.Parameters.CallId,
      ConsultWithOrTransferTo: this.Parameters.ConsultWithOrTransferTo,
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

  parseResponse(_response: Response): Promise<CCaaS_PauseRecordingAndTranscriptionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_PauseRecordingAndTranscriptionResponse());
  }
}

/**
 * CCaaS_PauseRecordingAndTranscription response message
 */
export class CCaaS_PauseRecordingAndTranscriptionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_PauseRecordingAndTranscription");
  }

  static fromResponse(_data?: unknown): CCaaS_PauseRecordingAndTranscriptionResponse {
    return new CCaaS_PauseRecordingAndTranscriptionResponse();
  }
}
