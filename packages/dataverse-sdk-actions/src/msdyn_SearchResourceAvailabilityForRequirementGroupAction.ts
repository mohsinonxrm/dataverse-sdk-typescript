import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    public readonly version: string | undefined,
    public readonly isWebApi: boolean | undefined,
    public readonly requirementGroup: EntityReference | AnyEntityPayload,
    public readonly requirementSpecification?: EntityReference | AnyEntityPayload,
    public readonly settings?: EntityReference | AnyEntityPayload
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
