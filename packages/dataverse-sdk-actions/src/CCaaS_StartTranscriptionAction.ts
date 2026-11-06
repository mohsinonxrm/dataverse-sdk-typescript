import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_StartTranscription action
 */
export interface CCaaS_StartTranscriptionResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_StartTranscription action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartTranscriptionActionParameters {
  SessionId: string;
  CommandContext?: string;
  ConsultWithOrTransferTo: string;
  CallId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_StartTranscription action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StartTranscriptionAction implements Executable<CCaaS_StartTranscriptionResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_StartTranscriptionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StartTranscription`;

    const body = requestBody({
      SessionId: this.parameters.SessionId,
      CommandContext: this.parameters.CommandContext,
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

  async parseResponse(response: Response): Promise<CCaaS_StartTranscriptionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_StartTranscriptionResponse;
    return (await response.json()) as CCaaS_StartTranscriptionResponse;
  }
}
