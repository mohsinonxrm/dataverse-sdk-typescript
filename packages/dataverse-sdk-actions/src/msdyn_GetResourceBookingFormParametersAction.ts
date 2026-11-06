import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetResourceBookingFormParameters action
 */
export interface msdyn_GetResourceBookingFormParametersResponse {
  ResourceBookingFormParameters: string;
}

/**
 * Parameters of the msdyn_GetResourceBookingFormParameters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceBookingFormParametersActionParameters {
  BookingContext: string;
  TimeZoneCode?: number;
}

/**
 * msdyn_GetResourceBookingFormParameters action
 *
 * Unbound action
 */
export class msdyn_GetResourceBookingFormParametersAction implements Executable<msdyn_GetResourceBookingFormParametersResponse> {
  constructor(public readonly parameters: msdyn_GetResourceBookingFormParametersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceBookingFormParameters`;

    const body = requestBody({
      BookingContext: this.parameters.BookingContext,
      TimeZoneCode: this.parameters.TimeZoneCode,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceBookingFormParametersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetResourceBookingFormParametersResponse;
  }
}
