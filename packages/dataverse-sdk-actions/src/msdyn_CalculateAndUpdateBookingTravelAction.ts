import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CalculateAndUpdateBookingTravel action
 */
export interface msdyn_CalculateAndUpdateBookingTravelResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_CalculateAndUpdateBookingTravel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CalculateAndUpdateBookingTravelActionParameters {
  Bookings: Record<string, unknown>[];
}

/**
 * msdyn_CalculateAndUpdateBookingTravel action
 *
 * Unbound action
 */
export class msdyn_CalculateAndUpdateBookingTravelAction implements Executable<msdyn_CalculateAndUpdateBookingTravelResponse> {
  constructor(public readonly parameters: msdyn_CalculateAndUpdateBookingTravelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalculateAndUpdateBookingTravel`;

    const body = requestBody({
      Bookings: this.parameters.Bookings,
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

  async parseResponse(response: Response): Promise<msdyn_CalculateAndUpdateBookingTravelResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CalculateAndUpdateBookingTravelResponse;
    return (await response.json()) as msdyn_CalculateAndUpdateBookingTravelResponse;
  }
}
