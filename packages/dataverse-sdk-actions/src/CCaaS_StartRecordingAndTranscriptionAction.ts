import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_StartRecordingAndTranscription action
 */
export interface CCaaS_StartRecordingAndTranscriptionResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_StartRecordingAndTranscription action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartRecordingAndTranscriptionActionParameters {
  CommandContext?: string;
  SessionId: string;
  ConsultWithOrTransferTo: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_StartRecordingAndTranscription action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StartRecordingAndTranscriptionAction implements Executable<CCaaS_StartRecordingAndTranscriptionResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_StartRecordingAndTranscriptionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StartRecordingAndTranscription`;

    const body = requestBody({
      CommandContext: this.parameters.CommandContext,
      SessionId: this.parameters.SessionId,
      ConsultWithOrTransferTo: this.parameters.ConsultWithOrTransferTo,
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

  async parseResponse(response: Response): Promise<CCaaS_StartRecordingAndTranscriptionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_StartRecordingAndTranscriptionResponse;
    return (await response.json()) as CCaaS_StartRecordingAndTranscriptionResponse;
  }
}
