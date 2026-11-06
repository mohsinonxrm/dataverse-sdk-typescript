import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetMultipleResourceBookingDetailsAndSummaries action
 */
export interface msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse;
    return (await response.json()) as msdyn_GetMultipleResourceBookingDetailsAndSummariesResponse;
  }
}
