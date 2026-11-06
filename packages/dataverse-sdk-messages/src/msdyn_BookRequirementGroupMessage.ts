import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_BookRequirementGroupResponse as msdyn_BookRequirementGroupResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_BookRequirementGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BookRequirementGroupRequestParameters {
  Start: string;
  Duration: number;
  BookingResources: string;
}

/**
 * msdyn_BookRequirementGroup request message
 *
 * Web API Action: msdyn_BookRequirementGroup
 *
 * The first argument is the id of the msdyn_requirementgroup record to call it on.
 */
export class msdyn_BookRequirementGroupRequest
  extends OrganizationRequest
  implements Executable<msdyn_BookRequirementGroupResponse>
{
  declare readonly Parameters: Readonly<msdyn_BookRequirementGroupRequestParameters>;

  constructor(
    public msdyn_requirementgroupId: string,
    parameters: msdyn_BookRequirementGroupRequestParameters
  ) {
    super("msdyn_BookRequirementGroup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_BookRequirementGroup`;

    const body = requestBody({
      Start: this.Parameters.Start,
      Duration: this.Parameters.Duration,
      BookingResources: this.Parameters.BookingResources,
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

  async parseResponse(response: Response): Promise<msdyn_BookRequirementGroupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_BookRequirementGroupResponse.fromResponse(text ? JSON.parse(text) : {});
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
