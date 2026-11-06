import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetMultipleResourceBookingDetailsAndSummaries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse {
  "@odata.context"?: string;
  Output: string;
}

/**
 * Parameters of the msdyn_GetMultipleResourceBookingDetailsAndSummaries action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMultipleResourceBookingDetailsAndSummariesActionParameters {
  Input?: string;
}

/**
 * msdyn_GetMultipleResourceBookingDetailsAndSummaries action
 *
 * Unbound action
 */
export class msdyn_GetMultipleResourceBookingDetailsAndSummariesAction implements Executable<msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse> {
  constructor(
    public readonly parameters: msdyn_GetMultipleResourceBookingDetailsAndSummariesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMultipleResourceBookingDetailsAndSummaries`;

    const body = requestBody({
      Input: this.parameters.Input,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse;
  }
}
