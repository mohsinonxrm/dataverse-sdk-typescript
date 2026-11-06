import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CancelBookingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CancelBookings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelBookingsResult {
  "@odata.context"?: string;
  BookingResult: string;
  CanceledBookingIds: string;
}

/**
 * msdyn_CancelBookings response message
 *
 * `result` is the value the msdyn_CancelBookings action returns (see {@link msdyn_CancelBookingsResult}).
 */
export class msdyn_CancelBookingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelBookingsResult) {
    super("msdyn_CancelBookings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CancelBookingsResponse {
    return new msdyn_CancelBookingsResponse(data as msdyn_CancelBookingsResult);
  }
}
