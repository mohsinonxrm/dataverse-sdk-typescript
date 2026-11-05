import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SearchResourceAvailabilityForRequirementGroup action
 */
export interface msdyn_SearchResourceAvailabilityForRequirementGroupResponse {}

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroup action
 *
 * Unbound action
 */
export class msdyn_SearchResourceAvailabilityForRequirementGroupAction implements Executable<msdyn_SearchResourceAvailabilityForRequirementGroupResponse> {
  constructor(
    public readonly version: string,
    public readonly isWebApi: boolean,
    public readonly requirementGroup: EntityReference,
    public readonly requirementSpecification: EntityReference,
    public readonly settings: EntityReference
  ) {}

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
    return data as msdyn_SearchResourceAvailabilityForRequirementGroupResponse;
  }
}
