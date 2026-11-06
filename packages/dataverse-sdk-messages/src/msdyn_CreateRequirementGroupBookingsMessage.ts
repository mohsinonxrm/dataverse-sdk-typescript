import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateRequirementGroupBookingsResponse as msdyn_CreateRequirementGroupBookingsResponseData } from "./types/index.js";

/**
 * msdyn_CreateRequirementGroupBookings request message
 *
 * Web API Action: msdyn_CreateRequirementGroupBookings
 */
export class msdyn_CreateRequirementGroupBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRequirementGroupBookingsResponse>
{
  constructor(
    public version: string | undefined,
    public start: string,
    public duration: number,
    public resourceAssignments: Record<string, unknown>[],
    public requirementGroup: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_CreateRequirementGroupBookings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementGroupBookings`;

    const body: Record<string, unknown> = {
      Version: this.version,
      Start: this.start,
      Duration: this.duration,
      ResourceAssignments: this.resourceAssignments,
      RequirementGroup: this.requirementGroup,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementGroupBookingsResponse> {
    const data = await response.json();
    return msdyn_CreateRequirementGroupBookingsResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateRequirementGroupBookings response message
 */
export class msdyn_CreateRequirementGroupBookingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateRequirementGroupBookingsResponseData) {
    super("msdyn_CreateRequirementGroupBookings");
  }

  static fromResponse(data: unknown): msdyn_CreateRequirementGroupBookingsResponse {
    return new msdyn_CreateRequirementGroupBookingsResponse(
      responseObject<msdyn_CreateRequirementGroupBookingsResponseData>(data)
    );
  }
}
