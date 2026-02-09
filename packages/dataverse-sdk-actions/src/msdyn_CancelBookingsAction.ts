import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CancelBookings action
 */
export interface msdyn_CancelBookingsResponse {
  CanceledBookingIds: string;
  BookingResult: string;
}

/**
 * msdyn_CancelBookings action
 *
 * Unbound action
 */
export class msdyn_CancelBookingsAction implements Executable<msdyn_CancelBookingsResponse> {
  constructor(
    public readonly bookingIds: string,
    public readonly defaultBookingDetail: EntityReference,
    public readonly bookingCancelContext: string,
    public readonly considerAppointments: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelBookings`;

    const body: Record<string, unknown> = {
      BookingIds: this.bookingIds,
      DefaultBookingDetail: this.defaultBookingDetail,
      BookingCancelContext: this.bookingCancelContext,
      ConsiderAppointments: this.considerAppointments,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CancelBookingsResponse> {
    const data = await response.json();
    return data as msdyn_CancelBookingsResponse;
  }
}
