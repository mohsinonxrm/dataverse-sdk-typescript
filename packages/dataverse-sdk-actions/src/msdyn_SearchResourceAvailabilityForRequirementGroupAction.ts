import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_SearchResourceAvailabilityForRequirementGroup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SearchResourceAvailabilityForRequirementGroupResponse {
  "@odata.context"?: string;
}

/**
 * Parameters of the msdyn_SearchResourceAvailabilityForRequirementGroup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SearchResourceAvailabilityForRequirementGroupActionParameters {
  Version?: string;
  IsWebApi?: boolean;
  RequirementGroup: EntityReference | AnyEntityPayload;
  RequirementSpecification?: EntityReference | AnyEntityPayload;
  Settings?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroup action
 *
 * Unbound action
 */
export class msdyn_SearchResourceAvailabilityForRequirementGroupAction implements Executable<msdyn_SearchResourceAvailabilityForRequirementGroupResponse> {
  constructor(
    public readonly parameters: msdyn_SearchResourceAvailabilityForRequirementGroupActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SearchResourceAvailabilityForRequirementGroup`;

    const body = requestBody({
      Version: this.parameters.Version,
      IsWebApi: this.parameters.IsWebApi,
      RequirementGroup: this.parameters.RequirementGroup,
      RequirementSpecification: this.parameters.RequirementSpecification,
      Settings: this.parameters.Settings,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SearchResourceAvailabilityForRequirementGroupResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SearchResourceAvailabilityForRequirementGroupResponse;
  }
}
