import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetLegalAcceptanceStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLegalAcceptanceStatusResponse {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * msdyn_GetLegalAcceptanceStatus action
 *
 * Unbound action
 */
export class msdyn_GetLegalAcceptanceStatusAction implements Executable<msdyn_GetLegalAcceptanceStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLegalAcceptanceStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLegalAcceptanceStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetLegalAcceptanceStatusResponse;
  }
}
