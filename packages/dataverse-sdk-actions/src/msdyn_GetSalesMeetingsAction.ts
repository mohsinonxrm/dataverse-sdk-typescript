import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSalesMeetings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesMeetingsResponse {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_result: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_GetSalesMeetings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesMeetingsActionParameters {
  msdyn_to: string;
  msdyn_from: string;
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
      msdyn_to: this.parameters.msdyn_to,
      msdyn_from: this.parameters.msdyn_from,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSalesMeetingsResponse;
  }
}
