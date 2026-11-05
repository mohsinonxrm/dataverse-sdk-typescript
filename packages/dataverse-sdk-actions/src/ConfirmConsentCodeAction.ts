import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ConfirmConsentCode action
 */
export interface ConfirmConsentCodeResponse {
  // No content returned
}

/**
 * ConfirmConsentCode action
 *
 * Bound action
 * Binding parameter: entity (mscrm.connectioninstance)
 */
export class ConfirmConsentCodeAction implements Executable<ConfirmConsentCodeResponse> {
  constructor(
    public readonly connectioninstanceId: string,
    public readonly code: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${this.connectioninstanceId})/Microsoft.Dynamics.CRM.ConfirmConsentCode`;

    const body: Record<string, unknown> = {
      code: this.code,
    };

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
    // No return value (204 No Content)
    return {};
  }
}
