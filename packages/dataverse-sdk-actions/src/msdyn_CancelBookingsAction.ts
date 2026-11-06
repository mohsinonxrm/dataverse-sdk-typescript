import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CancelBookings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelBookingsResponse {
  "@odata.context"?: string;
  BookingResult: string;
  CanceledBookingIds: string;
}

/**
 * Parameters of the msdyn_CancelBookings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelBookingsActionParameters {
  BookingIds?: string;
  DefaultBookingDetail?: EntityReference | AnyEntityPayload;
  BookingCancelContext?: string;
  ConsiderAppointments?: boolean;
}

/**
 * msdyn_CancelBookings action
 *
 * Unbound action
 */
export class msdyn_CancelBookingsAction implements Executable<msdyn_CancelBookingsResponse> {
  constructor(public readonly parameters: msdyn_CancelBookingsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelBookings`;

    const body = requestBody({
      BookingIds: this.parameters.BookingIds,
      DefaultBookingDetail: this.parameters.DefaultBookingDetail,
      BookingCancelContext: this.parameters.BookingCancelContext,
      ConsiderAppointments: this.parameters.ConsiderAppointments,
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

  async parseResponse(response: Response): Promise<msdyn_CancelBookingsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CancelBookingsResponse;
  }
}
