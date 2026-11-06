import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_StartRecordingAndTranscription message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartRecordingAndTranscriptionRequestParameters {
  CommandContext?: string;
  SessionId: string;
  ConsultWithOrTransferTo: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_StartRecordingAndTranscription request message
 *
 * Web API Action: CCaaS_StartRecordingAndTranscription
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StartRecordingAndTranscriptionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_StartRecordingAndTranscriptionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_StartRecordingAndTranscriptionRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_StartRecordingAndTranscriptionRequestParameters
  ) {
    super("CCaaS_StartRecordingAndTranscription", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StartRecordingAndTranscription`;

    const body = requestBody({
      CommandContext: this.Parameters.CommandContext,
      SessionId: this.Parameters.SessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_StartRecordingAndTranscriptionResponse> {
    // No return value (204 No Content)
    return new CCaaS_StartRecordingAndTranscriptionResponse();
  }
}

/**
 * CCaaS_StartRecordingAndTranscription response message
 */
export class CCaaS_StartRecordingAndTranscriptionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_StartRecordingAndTranscription");
  }

  static fromResponse(_data: unknown): CCaaS_StartRecordingAndTranscriptionResponse {
    return new CCaaS_StartRecordingAndTranscriptionResponse();
  }
}
