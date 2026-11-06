import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_CancelBookingsResponse as msdyn_CancelBookingsResponseData } from "./types/index.js";

/**
 * msdyn_CancelBookings request message
 *
 * Web API Action: msdyn_CancelBookings
 */
export class msdyn_CancelBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelBookingsResponse>
{
  constructor(
    public bookingIds: string,
    public defaultBookingDetail: EntityReference,
    public bookingCancelContext: string,
    public considerAppointments: boolean
  ) {
    super("msdyn_CancelBookings");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CancelBookingsResponse> {
    const data = await response.json();
    return msdyn_CancelBookingsResponse.fromResponse(data);
  }
}

/**
 * msdyn_CancelBookings response message
 */
export class msdyn_CancelBookingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelBookingsResponseData) {
    super("msdyn_CancelBookings");
  }

  static fromResponse(data: unknown): msdyn_CancelBookingsResponse {
    return new msdyn_CancelBookingsResponse(responseObject<msdyn_CancelBookingsResponseData>(data));
  }
}
