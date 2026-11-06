import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateExternalTransfer action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateExternalTransferResponse = void;

/**
 * Parameters of the CCaaS_InitiateExternalTransfer action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateExternalTransferActionParameters {
  ParticipantType: string;
  ParticipantId: string;
  CallId: string;
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateExternalTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateExternalTransferAction implements Executable<CCaaS_InitiateExternalTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateExternalTransferActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateExternalTransfer`;

    const body = requestBody({
      ParticipantType: this.parameters.ParticipantType,
      ParticipantId: this.parameters.ParticipantId,
      CallId: this.parameters.CallId,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateExternalTransferResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
