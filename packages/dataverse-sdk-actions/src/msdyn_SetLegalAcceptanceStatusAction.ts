import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SetLegalAcceptanceStatus action
 */
export interface msdyn_SetLegalAcceptanceStatusResponse {
  // No content returned
}

/**
 * msdyn_SetLegalAcceptanceStatus action
 *
 * Unbound action
 */
export class msdyn_SetLegalAcceptanceStatusAction implements Executable<msdyn_SetLegalAcceptanceStatusResponse> {
  constructor(public readonly status: boolean) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetLegalAcceptanceStatus`;

    const body: Record<string, unknown> = {
      Status: this.status,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SetLegalAcceptanceStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
