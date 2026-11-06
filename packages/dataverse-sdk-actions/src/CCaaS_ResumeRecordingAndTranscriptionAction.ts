import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_ResumeRecordingAndTranscription action
 */
export interface CCaaS_ResumeRecordingAndTranscriptionResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_ResumeRecordingAndTranscription action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ResumeRecordingAndTranscriptionActionParameters {
  ConsultWithOrTransferTo: string;
  CommandContext?: string;
  SessionId: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_ResumeRecordingAndTranscription action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ResumeRecordingAndTranscriptionAction implements Executable<CCaaS_ResumeRecordingAndTranscriptionResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_ResumeRecordingAndTranscriptionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ResumeRecordingAndTranscription`;

    const body = requestBody({
      ConsultWithOrTransferTo: this.parameters.ConsultWithOrTransferTo,
      CommandContext: this.parameters.CommandContext,
      SessionId: this.parameters.SessionId,
      CallId: this.parameters.CallId,
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

  async parseResponse(response: Response): Promise<CCaaS_ResumeRecordingAndTranscriptionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_ResumeRecordingAndTranscriptionResponse;
    return (await response.json()) as CCaaS_ResumeRecordingAndTranscriptionResponse;
  }
}
