import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetResourceBookingDetailsResponse as msdyn_GetResourceBookingDetailsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetResourceBookingDetailsResponse.fromResponse({});
    return msdyn_GetResourceBookingDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetResourceBookingDetails response message
 */
export class msdyn_GetResourceBookingDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceBookingDetailsResponseData) {
    super("msdyn_GetResourceBookingDetails");
  }

  static fromResponse(data: unknown): msdyn_GetResourceBookingDetailsResponse {
    return new msdyn_GetResourceBookingDetailsResponse(
      responseObject<msdyn_GetResourceBookingDetailsResponseData>(data)
    );
  }
}
