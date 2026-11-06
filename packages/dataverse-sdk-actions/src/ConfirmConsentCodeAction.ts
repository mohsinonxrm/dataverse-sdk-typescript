import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ConfirmConsentCode action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ConfirmConsentCodeResponse = void;

/**
 * Parameters of the ConfirmConsentCode action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ConfirmConsentCodeActionParameters {
  code: string;
}

/**
 * ConfirmConsentCode action
 *
 * Bound action
 * Binding parameter: entity (mscrm.connectioninstance)
 *
 * The first argument is the id of the connectioninstance record to call it on.
 */
export class ConfirmConsentCodeAction implements Executable<ConfirmConsentCodeResponse> {
  constructor(
    public readonly connectioninstanceId: string,
    public readonly parameters: ConfirmConsentCodeActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${this.connectioninstanceId})/Microsoft.Dynamics.CRM.ConfirmConsentCode`;

    const body = requestBody({
      code: this.parameters.code,
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

  parseResponse(_response: Response): Promise<ConfirmConsentCodeResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
