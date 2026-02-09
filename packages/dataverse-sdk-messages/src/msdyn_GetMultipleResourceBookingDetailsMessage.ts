import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetMultipleResourceBookingDetails request message
 *
 * Web API Action: msdyn_GetMultipleResourceBookingDetails
 */
export class msdyn_GetMultipleResourceBookingDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMultipleResourceBookingDetailsResponse>
{
  constructor(
    public startDate: string,
    public endDate: string,
    public timescale: number,
    public schedulerSettings: string,
    public targets: string,
    public considerAppointments: boolean,
    public ignoreTimeZone: boolean
  ) {
    super("msdyn_GetMultipleResourceBookingDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMultipleResourceBookingDetails`;

    const body: Record<string, unknown> = {
      StartDate: this.startDate,
      EndDate: this.endDate,
      Timescale: this.timescale,
      SchedulerSettings: this.schedulerSettings,
      Targets: this.targets,
      ConsiderAppointments: this.considerAppointments,
      IgnoreTimeZone: this.ignoreTimeZone,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMultipleResourceBookingDetailsResponse> {
    const data = await response.json();
    return msdyn_GetMultipleResourceBookingDetailsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      StartDate: this.startDate,
      EndDate: this.endDate,
      Timescale: this.timescale,
      SchedulerSettings: this.schedulerSettings,
      Targets: this.targets,
      ConsiderAppointments: this.considerAppointments,
      IgnoreTimeZone: this.ignoreTimeZone,
    };
  }
}

/**
 * msdyn_GetMultipleResourceBookingDetails response message
 */
export class msdyn_GetMultipleResourceBookingDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMultipleResourceBookingDetailsResponse) {
    super("msdyn_GetMultipleResourceBookingDetails");
  }

  static fromResponse(data: unknown): msdyn_GetMultipleResourceBookingDetailsResponse {
    return new msdyn_GetMultipleResourceBookingDetailsResponse((data as any).value);
  }
}
