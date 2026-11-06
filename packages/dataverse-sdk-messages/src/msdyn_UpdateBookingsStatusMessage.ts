import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_UpdateBookingsStatusResponse as msdyn_UpdateBookingsStatusResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_UpdateBookingsStatusResponse.fromResponse(text ? JSON.parse(text) : {});
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
