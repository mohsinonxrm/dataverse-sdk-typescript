import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ConfirmConsentCode action
 */
export interface ConfirmConsentCodeResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<ConfirmConsentCodeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ConfirmConsentCodeResponse;
  }
}
