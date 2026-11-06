import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RequirementGroupOverview action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RequirementGroupOverviewResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_RequirementGroupOverview action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RequirementGroupOverviewActionParameters {
  Start?: string;
  End?: string;
  Duration?: number;
  Interval?: number;
  ResourceIdsFilter?: string;
  OverviewTypes?: string;
  ConstraintBag?: string;
  RemoveRedundantCrewCombinations?: boolean;
}

/**
 * msdyn_RequirementGroupOverview action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_requirementgroup)
 *
 * The first argument is the id of the msdyn_requirementgroup record to call it on.
 */
export class msdyn_RequirementGroupOverviewAction implements Executable<msdyn_RequirementGroupOverviewResponse> {
  constructor(
    public readonly msdyn_requirementgroupId: string,
    public readonly parameters: msdyn_RequirementGroupOverviewActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_RequirementGroupOverview`;

    const body = requestBody({
      Start: this.parameters.Start,
      End: this.parameters.End,
      Duration: this.parameters.Duration,
      Interval: this.parameters.Interval,
      ResourceIdsFilter: this.parameters.ResourceIdsFilter,
      OverviewTypes: this.parameters.OverviewTypes,
      ConstraintBag: this.parameters.ConstraintBag,
      RemoveRedundantCrewCombinations: this.parameters.RemoveRedundantCrewCombinations,
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

  async parseResponse(response: Response): Promise<msdyn_RequirementGroupOverviewResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RequirementGroupOverviewResponse;
  }
}
