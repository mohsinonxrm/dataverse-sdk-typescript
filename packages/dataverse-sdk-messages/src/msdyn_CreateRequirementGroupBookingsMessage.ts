import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateRequirementGroupBookingsResponse as msdyn_CreateRequirementGroupBookingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateRequirementGroupBookings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRequirementGroupBookingsRequestParameters {
  Version?: string;
  Start: string;
  Duration: number;
  ResourceAssignments: Record<string, unknown>[];
  RequirementGroup: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateRequirementGroupBookings request message
 *
 * Web API Action: msdyn_CreateRequirementGroupBookings
 */
export class msdyn_CreateRequirementGroupBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRequirementGroupBookingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateRequirementGroupBookingsRequestParameters>;

  constructor(parameters: msdyn_CreateRequirementGroupBookingsRequestParameters) {
    super("msdyn_CreateRequirementGroupBookings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementGroupBookings`;

    const body = requestBody({
      Version: this.Parameters.Version,
      Start: this.Parameters.Start,
      Duration: this.Parameters.Duration,
      ResourceAssignments: this.Parameters.ResourceAssignments,
      RequirementGroup: this.Parameters.RequirementGroup,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementGroupBookingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateRequirementGroupBookingsResponse.fromResponse(text ? JSON.parse(text) : {});
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
