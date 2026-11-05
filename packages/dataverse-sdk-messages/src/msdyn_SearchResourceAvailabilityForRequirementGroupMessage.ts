import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroup request message
 *
 * Web API Action: msdyn_SearchResourceAvailabilityForRequirementGroup
 */
export class msdyn_SearchResourceAvailabilityForRequirementGroupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SearchResourceAvailabilityForRequirementGroupResponse>
{
  constructor(
    public version: string,
    public isWebApi: boolean,
    public requirementGroup: EntityReference,
    public requirementSpecification: EntityReference,
    public settings: EntityReference
  ) {
    super("msdyn_SearchResourceAvailabilityForRequirementGroup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SearchResourceAvailabilityForRequirementGroup`;

    const body: Record<string, unknown> = {
      Version: this.version,
      IsWebApi: this.isWebApi,
      RequirementGroup: this.requirementGroup,
      RequirementSpecification: this.requirementSpecification,
      Settings: this.settings,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SearchResourceAvailabilityForRequirementGroupResponse> {
    const data = await response.json();
    return msdyn_SearchResourceAvailabilityForRequirementGroupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Version: this.version,
      IsWebApi: this.isWebApi,
      RequirementGroup: this.requirementGroup,
      RequirementSpecification: this.requirementSpecification,
      Settings: this.settings,
    };
  }
}

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroup response message
 */
export class msdyn_SearchResourceAvailabilityForRequirementGroupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SearchResourceAvailabilityForRequirementGroupResponse) {
    super("msdyn_SearchResourceAvailabilityForRequirementGroup");
  }

  static fromResponse(data: unknown): msdyn_SearchResourceAvailabilityForRequirementGroupResponse {
    return new msdyn_SearchResourceAvailabilityForRequirementGroupResponse((data as any).value);
  }
}
