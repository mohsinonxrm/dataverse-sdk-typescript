import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_RejectExternalTransfer action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_RejectExternalTransferResponse = void;

/**
 * Parameters of the CCaaS_RejectExternalTransfer action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RejectExternalTransferActionParameters {
  ParticipantId: string;
  CallId?: string;
  CommandContext?: string;
  ParticipantType: string;
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_RejectExternalTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RejectExternalTransferAction implements Executable<CCaaS_RejectExternalTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_RejectExternalTransferActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejectExternalTransfer`;

    const body = requestBody({
      ParticipantId: this.parameters.ParticipantId,
      CallId: this.parameters.CallId,
      CommandContext: this.parameters.CommandContext,
      ParticipantType: this.parameters.ParticipantType,
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

  parseResponse(_response: Response): Promise<CCaaS_RejectExternalTransferResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
