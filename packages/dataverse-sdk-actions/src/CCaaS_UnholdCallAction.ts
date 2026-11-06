import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_UnholdCall action
 */
export interface CCaaS_UnholdCallResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_UnholdCall action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_UnholdCallActionParameters {
  SessionId: string;
  ParticipantId: string;
  CommandContext?: string;
  ApiVersion: string;
  ParticipantType: string;
  CallId?: string;
  ConsultWithOrTransferTo: string;
}

/**
 * CCaaS_UnholdCall action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_UnholdCallAction implements Executable<CCaaS_UnholdCallResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_UnholdCallActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_UnholdCall`;

    const body = requestBody({
      SessionId: this.parameters.SessionId,
      ParticipantId: this.parameters.ParticipantId,
      CommandContext: this.parameters.CommandContext,
      ApiVersion: this.parameters.ApiVersion,
      ParticipantType: this.parameters.ParticipantType,
      CallId: this.parameters.CallId,
      ConsultWithOrTransferTo: this.parameters.ConsultWithOrTransferTo,
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

  async parseResponse(response: Response): Promise<CCaaS_UnholdCallResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_UnholdCallResponse;
    return (await response.json()) as CCaaS_UnholdCallResponse;
  }
}
