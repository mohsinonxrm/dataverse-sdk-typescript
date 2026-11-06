import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetMultipleResourceBookingDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMultipleResourceBookingDetailsRequestParameters {
  StartDate: string;
  EndDate: string;
  Timescale: number;
  SchedulerSettings?: string;
  Targets: string;
  ConsiderAppointments?: boolean;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_GetMultipleResourceBookingDetails request message
 *
 * Web API Action: msdyn_GetMultipleResourceBookingDetails
 */
export class msdyn_GetMultipleResourceBookingDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMultipleResourceBookingDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMultipleResourceBookingDetailsRequestParameters>;

  constructor(parameters: msdyn_GetMultipleResourceBookingDetailsRequestParameters) {
    super("msdyn_GetMultipleResourceBookingDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMultipleResourceBookingDetails`;

    const body = requestBody({
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      Timescale: this.Parameters.Timescale,
      SchedulerSettings: this.Parameters.SchedulerSettings,
      Targets: this.Parameters.Targets,
      ConsiderAppointments: this.Parameters.ConsiderAppointments,
      IgnoreTimeZone: this.Parameters.IgnoreTimeZone,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMultipleResourceBookingDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetMultipleResourceBookingDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetMultipleResourceBookingDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMultipleResourceBookingDetailsResult {
  "@odata.context"?: string;
  BookingDetailResult: string;
}

/**
 * msdyn_GetMultipleResourceBookingDetails response message
 *
 * `result` is the value the msdyn_GetMultipleResourceBookingDetails action returns (see {@link msdyn_GetMultipleResourceBookingDetailsResult}).
 */
export class msdyn_GetMultipleResourceBookingDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMultipleResourceBookingDetailsResult) {
    super("msdyn_GetMultipleResourceBookingDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetMultipleResourceBookingDetailsResponse {
    return new msdyn_GetMultipleResourceBookingDetailsResponse(
      data as msdyn_GetMultipleResourceBookingDetailsResult
    );
  }
}
