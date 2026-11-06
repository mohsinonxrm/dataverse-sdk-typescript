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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetLegalAcceptanceStatusResponse;
    return (await response.json()) as msdyn_GetLegalAcceptanceStatusResponse;
  }
}
