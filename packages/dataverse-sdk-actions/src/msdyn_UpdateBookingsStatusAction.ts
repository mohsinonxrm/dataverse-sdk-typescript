import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_UpdateBookingsStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateBookingsStatusResponse {
  "@odata.context"?: string;
  BookingResult: string;
  UpdatedBookingIds: string;
}

/**
 * Parameters of the msdyn_UpdateBookingsStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateBookingsStatusActionParameters {
  TargetStatusId: string;
  BookingIds?: string;
  DefaultBookingDetail?: EntityReference | AnyEntityPayload;
  BookingStatusChangeContext?: string;
  ConsiderAppointments?: boolean;
}

/**
 * msdyn_UpdateBookingsStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateBookingsStatusAction implements Executable<msdyn_UpdateBookingsStatusResponse> {
  constructor(public readonly parameters: msdyn_UpdateBookingsStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateBookingsStatus`;

    const body = requestBody({
      TargetStatusId: this.parameters.TargetStatusId,
      BookingIds: this.parameters.BookingIds,
      DefaultBookingDetail: this.parameters.DefaultBookingDetail,
      BookingStatusChangeContext: this.parameters.BookingStatusChangeContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateBookingsStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateBookingsStatusResponse;
  }
}
