import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_UpdateBookingsStatus request message
 *
 * Web API Action: msdyn_UpdateBookingsStatus
 */
export class msdyn_UpdateBookingsStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateBookingsStatusResponse>
{
  constructor(
    public targetStatusId: string,
    public bookingIds: string,
    public defaultBookingDetail: EntityReference,
    public bookingStatusChangeContext: string,
    public considerAppointments: boolean
  ) {
    super("msdyn_UpdateBookingsStatus");
  }

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
    return msdyn_UpdateBookingsStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TargetStatusId: this.targetStatusId,
      BookingIds: this.bookingIds,
      DefaultBookingDetail: this.defaultBookingDetail,
      BookingStatusChangeContext: this.bookingStatusChangeContext,
      ConsiderAppointments: this.considerAppointments,
    };
  }
}

/**
 * msdyn_UpdateBookingsStatus response message
 */
export class msdyn_UpdateBookingsStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateBookingsStatusResponse) {
    super("msdyn_UpdateBookingsStatus");
  }

  static fromResponse(data: unknown): msdyn_UpdateBookingsStatusResponse {
    return new msdyn_UpdateBookingsStatusResponse((data as any).value);
  }
}
