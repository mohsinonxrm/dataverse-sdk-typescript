import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_UpdateBookingsStatus action
 */
export interface msdyn_UpdateBookingsStatusResponse {
  UpdatedBookingIds: string;
  BookingResult: string;
}

/**
 * msdyn_UpdateBookingsStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateBookingsStatusAction implements Executable<msdyn_UpdateBookingsStatusResponse> {
  constructor(
    public readonly targetStatusId: string,
    public readonly bookingIds: string,
    public readonly defaultBookingDetail: EntityReference,
    public readonly bookingStatusChangeContext: string,
    public readonly considerAppointments: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateBookingsStatus`;

    const body: Record<string, unknown> = {
      TargetStatusId: this.targetStatusId,
      BookingIds: this.bookingIds,
      DefaultBookingDetail: this.defaultBookingDetail,
      BookingStatusChangeContext: this.bookingStatusChangeContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateBookingsStatusResponse> {
    const data = await response.json();
    return data as msdyn_UpdateBookingsStatusResponse;
  }
}
