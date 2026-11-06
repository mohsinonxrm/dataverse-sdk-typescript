import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CancelBookingsResponse as msdyn_CancelBookingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CancelBookings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelBookingsRequestParameters {
  BookingIds?: string;
  DefaultBookingDetail?: EntityReference | AnyEntityPayload;
  BookingCancelContext?: string;
  ConsiderAppointments?: boolean;
}

/**
 * msdyn_CancelBookings request message
 *
 * Web API Action: msdyn_CancelBookings
 */
export class msdyn_CancelBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelBookingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CancelBookingsRequestParameters>;

  constructor(parameters: msdyn_CancelBookingsRequestParameters = {}) {
    super("msdyn_CancelBookings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelBookings`;

    const body = requestBody({
      BookingIds: this.Parameters.BookingIds,
      DefaultBookingDetail: this.Parameters.DefaultBookingDetail,
      BookingCancelContext: this.Parameters.BookingCancelContext,
      ConsiderAppointments: this.Parameters.ConsiderAppointments,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CancelBookingsResponse.fromResponse(text ? JSON.parse(text) : {});
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
