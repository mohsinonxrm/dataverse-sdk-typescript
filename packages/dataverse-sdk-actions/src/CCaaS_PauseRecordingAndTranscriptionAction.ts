import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_PauseRecordingAndTranscription action
 */
export interface CCaaS_PauseRecordingAndTranscriptionResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_PauseRecordingAndTranscription action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_PauseRecordingAndTranscriptionActionParameters {
  CommandContext?: string;
  SessionId: string;
  CallId?: string;
  ConsultWithOrTransferTo: string;
  ApiVersion: string;
}

/**
 * CCaaS_PauseRecordingAndTranscription action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_PauseRecordingAndTranscriptionAction implements Executable<CCaaS_PauseRecordingAndTranscriptionResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_PauseRecordingAndTranscriptionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_PauseRecordingAndTranscription`;

    const body = requestBody({
      CommandContext: this.parameters.CommandContext,
      SessionId: this.parameters.SessionId,
      CallId: this.parameters.CallId,
      ConsultWithOrTransferTo: this.parameters.ConsultWithOrTransferTo,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_PauseRecordingAndTranscriptionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_PauseRecordingAndTranscriptionResponse;
    return (await response.json()) as CCaaS_PauseRecordingAndTranscriptionResponse;
  }
}
