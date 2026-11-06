import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetResourceBookingFormParameters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceBookingFormParametersResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetResourceBookingFormParametersResponse;
  }
}
