import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAvailabilitySummaryFromDemandResponse as msdyn_GetAvailabilitySummaryFromDemandResponseData } from "./types/index.js";

/**
 * msdyn_GetAvailabilitySummaryFromDemand request message
 *
 * Web API Action: msdyn_GetAvailabilitySummaryFromDemand
 */
export class msdyn_GetAvailabilitySummaryFromDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAvailabilitySummaryFromDemandResponse>
{
  constructor(
    public requirementIds: string,
    public timescale: number,
    public timeZoneCode: number,
    public resourceIds: string,
    public startDate: string,
    public endDate: string,
    public considerAppointments?: boolean,
    public ignoreTimeZone?: boolean
  ) {
    super("msdyn_GetAvailabilitySummaryFromDemand");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAvailabilitySummaryFromDemand`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
      TimeZoneCode: this.timeZoneCode,
      ResourceIds: this.resourceIds,
      StartDate: this.startDate,
      EndDate: this.endDate,
      ConsiderAppointments: this.considerAppointments,
      IgnoreTimeZone: this.ignoreTimeZone,
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

  async parseResponse(response: Response): Promise<msdyn_GetAvailabilitySummaryFromDemandResponse> {
    const data = await response.json();
    return msdyn_GetAvailabilitySummaryFromDemandResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAvailabilitySummaryFromDemand response message
 */
export class msdyn_GetAvailabilitySummaryFromDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAvailabilitySummaryFromDemandResponseData) {
    super("msdyn_GetAvailabilitySummaryFromDemand");
  }

  static fromResponse(data: unknown): msdyn_GetAvailabilitySummaryFromDemandResponse {
    return new msdyn_GetAvailabilitySummaryFromDemandResponse(
      responseObject<msdyn_GetAvailabilitySummaryFromDemandResponseData>(data)
    );
  }
}
