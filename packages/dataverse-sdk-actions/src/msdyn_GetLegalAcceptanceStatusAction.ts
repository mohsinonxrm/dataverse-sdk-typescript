import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetLegalAcceptanceStatus action
 */
export interface msdyn_GetLegalAcceptanceStatusResponse {
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
    const data = await response.json();
    return data as msdyn_GetLegalAcceptanceStatusResponse;
  }
}
