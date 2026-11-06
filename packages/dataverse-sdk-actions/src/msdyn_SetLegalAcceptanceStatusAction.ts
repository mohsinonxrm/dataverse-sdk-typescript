import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SetLegalAcceptanceStatus action
 */
export interface msdyn_SetLegalAcceptanceStatusResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SetLegalAcceptanceStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetLegalAcceptanceStatusActionParameters {
  Status: boolean;
}

/**
 * msdyn_SetLegalAcceptanceStatus action
 *
 * Unbound action
 */
export class msdyn_SetLegalAcceptanceStatusAction implements Executable<msdyn_SetLegalAcceptanceStatusResponse> {
  constructor(public readonly parameters: msdyn_SetLegalAcceptanceStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetLegalAcceptanceStatus`;

    const body = requestBody({
      Status: this.parameters.Status,
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

  async parseResponse(response: Response): Promise<msdyn_SetLegalAcceptanceStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SetLegalAcceptanceStatusResponse;
    return (await response.json()) as msdyn_SetLegalAcceptanceStatusResponse;
  }
}
