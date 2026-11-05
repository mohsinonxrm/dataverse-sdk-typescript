import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CalculateAndUpdateBookingTravel action
 */
export interface msdyn_CalculateAndUpdateBookingTravelResponse {
  value: EntityReference[];
}

/**
 * msdyn_CalculateAndUpdateBookingTravel action
 *
 * Unbound action
 */
export class msdyn_CalculateAndUpdateBookingTravelAction implements Executable<msdyn_CalculateAndUpdateBookingTravelResponse> {
  constructor(public readonly bookings: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalculateAndUpdateBookingTravel`;

    const body: Record<string, unknown> = {
      Bookings: this.bookings,
    };

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
    const data = await response.json();
    return data as msdyn_CalculateAndUpdateBookingTravelResponse;
  }
}
