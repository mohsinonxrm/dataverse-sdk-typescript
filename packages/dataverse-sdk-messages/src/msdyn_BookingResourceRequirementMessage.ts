import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_BookingResourceRequirementResponse as msdyn_BookingResourceRequirementResponseData } from "./types/index.js";

/**
 * msdyn_BookingResourceRequirement request message
 *
 * Web API Action: msdyn_BookingResourceRequirement
 */
export class msdyn_BookingResourceRequirementRequest
  extends OrganizationRequest
  implements Executable<msdyn_BookingResourceRequirementResponse>
{
  constructor(
    public msdyn_resourcerequirementId: string,
    public resourceId: string,
    public bookingStatusId: string,
    public bookingMethod: number,
    public bookingType: number,
    public startDateTime: string,
    public endDateTime: string,
    public timeframe: number,
    public hours: number,
    public percentage: number
  ) {
    super("msdyn_BookingResourceRequirement");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_resourcerequirements(${this.msdyn_resourcerequirementId})/Microsoft.Dynamics.CRM.msdyn_BookingResourceRequirement`;

    const body: Record<string, unknown> = {
      ResourceId: this.resourceId,
      BookingStatusId: this.bookingStatusId,
      BookingMethod: this.bookingMethod,
      BookingType: this.bookingType,
      StartDateTime: this.startDateTime,
      EndDateTime: this.endDateTime,
      Timeframe: this.timeframe,
      Hours: this.hours,
      Percentage: this.percentage,
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

  async parseResponse(response: Response): Promise<msdyn_BookingResourceRequirementResponse> {
    const data = await response.json();
    return msdyn_BookingResourceRequirementResponse.fromResponse(data);
  }
}

/**
 * msdyn_BookingResourceRequirement response message
 */
export class msdyn_BookingResourceRequirementResponse extends OrganizationResponse {
  constructor(public result: msdyn_BookingResourceRequirementResponseData) {
    super("msdyn_BookingResourceRequirement");
  }

  static fromResponse(data: unknown): msdyn_BookingResourceRequirementResponse {
    return new msdyn_BookingResourceRequirementResponse(
      responseObject<msdyn_BookingResourceRequirementResponseData>(data)
    );
  }
}
