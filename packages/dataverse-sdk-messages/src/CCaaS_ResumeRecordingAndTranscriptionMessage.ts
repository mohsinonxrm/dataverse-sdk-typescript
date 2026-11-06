import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ResumeRecordingAndTranscription message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ResumeRecordingAndTranscriptionRequestParameters {
  ConsultWithOrTransferTo: string;
  CommandContext?: string;
  SessionId: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_ResumeRecordingAndTranscription request message
 *
 * Web API Action: CCaaS_ResumeRecordingAndTranscription
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ResumeRecordingAndTranscriptionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ResumeRecordingAndTranscriptionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ResumeRecordingAndTranscriptionRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_ResumeRecordingAndTranscriptionRequestParameters
  ) {
    super("CCaaS_ResumeRecordingAndTranscription", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ResumeRecordingAndTranscription`;

    const body = requestBody({
      ConsultWithOrTransferTo: this.Parameters.ConsultWithOrTransferTo,
      CommandContext: this.Parameters.CommandContext,
      SessionId: this.Parameters.SessionId,
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

  parseResponse(_response: Response): Promise<CCaaS_ResumeRecordingAndTranscriptionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_ResumeRecordingAndTranscriptionResponse());
  }
}

/**
 * CCaaS_ResumeRecordingAndTranscription response message
 */
export class CCaaS_ResumeRecordingAndTranscriptionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ResumeRecordingAndTranscription");
  }

  static fromResponse(_data?: unknown): CCaaS_ResumeRecordingAndTranscriptionResponse {
    return new CCaaS_ResumeRecordingAndTranscriptionResponse();
  }
}
