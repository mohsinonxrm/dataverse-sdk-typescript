import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_BookRequirementGroupResponse as msdyn_BookRequirementGroupResponseData } from "./types/index.js";

/**
 * msdyn_BookRequirementGroup request message
 *
 * Web API Action: msdyn_BookRequirementGroup
 */
export class msdyn_BookRequirementGroupRequest
  extends OrganizationRequest
  implements Executable<msdyn_BookRequirementGroupResponse>
{
  constructor(
    public msdyn_requirementgroupId: string,
    public start: string,
    public duration: number,
    public bookingResources: string
  ) {
    super("msdyn_BookRequirementGroup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_BookRequirementGroup`;

    const body: Record<string, unknown> = {
      Start: this.start,
      Duration: this.duration,
      BookingResources: this.bookingResources,
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

  async parseResponse(response: Response): Promise<msdyn_BookRequirementGroupResponse> {
    const data = await response.json();
    return msdyn_BookRequirementGroupResponse.fromResponse(data);
  }
}

/**
 * msdyn_BookRequirementGroup response message
 */
export class msdyn_BookRequirementGroupResponse extends OrganizationResponse {
  constructor(public result: msdyn_BookRequirementGroupResponseData) {
    super("msdyn_BookRequirementGroup");
  }

  static fromResponse(data: unknown): msdyn_BookRequirementGroupResponse {
    return new msdyn_BookRequirementGroupResponse(
      responseObject<msdyn_BookRequirementGroupResponseData>(data)
    );
  }
}
