import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_StopTranscription action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_StopTranscriptionResponse = void;

/**
 * Parameters of the CCaaS_StopTranscription action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StopTranscriptionActionParameters {
  CallId?: string;
  CommandContext?: string;
  ConsultWithOrTransferTo: string;
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_StopTranscription action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StopTranscriptionAction implements Executable<CCaaS_StopTranscriptionResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_StopTranscriptionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StopTranscription`;

    const body = requestBody({
      CallId: this.parameters.CallId,
      CommandContext: this.parameters.CommandContext,
      ConsultWithOrTransferTo: this.parameters.ConsultWithOrTransferTo,
      SessionId: this.parameters.SessionId,
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

  parseResponse(_response: Response): Promise<CCaaS_StopTranscriptionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
