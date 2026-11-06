import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetResourceBookingDetailsResponse as msdyn_GetResourceBookingDetailsResponseData } from "./types/index.js";

/**
 * msdyn_GetResourceBookingDetails request message
 *
 * Web API Action: msdyn_GetResourceBookingDetails
 */
export class msdyn_GetResourceBookingDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceBookingDetailsResponse>
{
  constructor(
    public bookableresourceId: string,
    public startDate: string,
    public endDate: string,
    public timescale: number,
    public schedulerSettings: string,
    public considerAppointments: boolean
  ) {
    super("msdyn_GetResourceBookingDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresources(${this.bookableresourceId})/Microsoft.Dynamics.CRM.msdyn_GetResourceBookingDetails`;

    const body: Record<string, unknown> = {
      StartDate: this.startDate,
      EndDate: this.endDate,
      Timescale: this.timescale,
      SchedulerSettings: this.schedulerSettings,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceBookingDetailsResponse> {
    const data = await response.json();
    return msdyn_GetResourceBookingDetailsResponse.fromResponse(data);
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
