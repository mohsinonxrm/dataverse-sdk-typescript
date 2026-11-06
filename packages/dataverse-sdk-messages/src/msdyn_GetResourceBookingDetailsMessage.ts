import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetResourceBookingDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceBookingDetailsRequestParameters {
  StartDate: string;
  EndDate: string;
  Timescale: number;
  SchedulerSettings?: string;
  ConsiderAppointments?: boolean;
}

/**
 * msdyn_GetResourceBookingDetails request message
 *
 * Web API Action: msdyn_GetResourceBookingDetails
 *
 * The first argument is the id of the bookableresource record to call it on.
 */
export class msdyn_GetResourceBookingDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceBookingDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourceBookingDetailsRequestParameters>;

  constructor(
    public bookableresourceId: string,
    parameters: msdyn_GetResourceBookingDetailsRequestParameters
  ) {
    super("msdyn_GetResourceBookingDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresources(${this.bookableresourceId})/Microsoft.Dynamics.CRM.msdyn_GetResourceBookingDetails`;

    const body = requestBody({
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      Timescale: this.Parameters.Timescale,
      SchedulerSettings: this.Parameters.SchedulerSettings,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceBookingDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetResourceBookingDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetResourceBookingDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceBookingDetailsResult {
  "@odata.context"?: string;
  BookingDetailResult: string;
}

/**
 * msdyn_GetResourceBookingDetails response message
 *
 * `result` is the value the msdyn_GetResourceBookingDetails action returns (see {@link msdyn_GetResourceBookingDetailsResult}).
 */
export class msdyn_GetResourceBookingDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceBookingDetailsResult) {
    super("msdyn_GetResourceBookingDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetResourceBookingDetailsResponse {
    return new msdyn_GetResourceBookingDetailsResponse(
      data as msdyn_GetResourceBookingDetailsResult
    );
  }
}
