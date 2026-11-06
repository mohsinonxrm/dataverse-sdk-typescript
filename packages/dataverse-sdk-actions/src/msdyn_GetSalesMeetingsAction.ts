import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSalesMeetings action
 */
export interface msdyn_GetSalesMeetingsResponse {
  msdyn_result: string;
  msdyn_error: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_GetSalesMeetings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesMeetingsActionParameters {
  msdyn_from: string;
  msdyn_to: string;
}

/**
 * msdyn_GetSalesMeetings action
 *
 * Unbound action
 */
export class msdyn_GetSalesMeetingsAction implements Executable<msdyn_GetSalesMeetingsResponse> {
  constructor(public readonly parameters: msdyn_GetSalesMeetingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesMeetings`;

    const body = requestBody({
      msdyn_from: this.parameters.msdyn_from,
      msdyn_to: this.parameters.msdyn_to,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesMeetingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetSalesMeetingsResponse;
    return (await response.json()) as msdyn_GetSalesMeetingsResponse;
  }
}
