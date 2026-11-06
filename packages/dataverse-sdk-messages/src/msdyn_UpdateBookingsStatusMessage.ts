import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_UpdateBookingsStatusResponse as msdyn_UpdateBookingsStatusResponseData } from "./types/index.js";

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
    public bookingIds?: string,
    public defaultBookingDetail?: EntityReference | AnyEntityPayload,
    public bookingStatusChangeContext?: string,
    public considerAppointments?: boolean
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_UpdateBookingsStatusResponse> {
    const data = await response.json();
    return msdyn_UpdateBookingsStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_UpdateBookingsStatus response message
 */
export class msdyn_UpdateBookingsStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateBookingsStatusResponseData) {
    super("msdyn_UpdateBookingsStatus");
  }

  static fromResponse(data: unknown): msdyn_UpdateBookingsStatusResponse {
    return new msdyn_UpdateBookingsStatusResponse(
      responseObject<msdyn_UpdateBookingsStatusResponseData>(data)
    );
  }
}
