import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_UpdateBookingsStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateBookingsStatusRequestParameters {
  TargetStatusId: string;
  BookingIds?: string;
  DefaultBookingDetail?: EntityReference | AnyEntityPayload;
  BookingStatusChangeContext?: string;
  ConsiderAppointments?: boolean;
}

/**
 * msdyn_UpdateBookingsStatus request message
 *
 * Web API Action: msdyn_UpdateBookingsStatus
 */
export class msdyn_UpdateBookingsStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateBookingsStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateBookingsStatusRequestParameters>;

  constructor(parameters: msdyn_UpdateBookingsStatusRequestParameters) {
    super("msdyn_UpdateBookingsStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateBookingsStatus`;

    const body = requestBody({
      TargetStatusId: this.Parameters.TargetStatusId,
      BookingIds: this.Parameters.BookingIds,
      DefaultBookingDetail: this.Parameters.DefaultBookingDetail,
      BookingStatusChangeContext: this.Parameters.BookingStatusChangeContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateBookingsStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateBookingsStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateBookingsStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateBookingsStatusResult {
  "@odata.context"?: string;
  BookingResult: string;
  UpdatedBookingIds: string;
}

/**
 * msdyn_UpdateBookingsStatus response message
 *
 * `result` is the value the msdyn_UpdateBookingsStatus action returns (see {@link msdyn_UpdateBookingsStatusResult}).
 */
export class msdyn_UpdateBookingsStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateBookingsStatusResult) {
    super("msdyn_UpdateBookingsStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateBookingsStatusResponse {
    return new msdyn_UpdateBookingsStatusResponse(data as msdyn_UpdateBookingsStatusResult);
  }
}
