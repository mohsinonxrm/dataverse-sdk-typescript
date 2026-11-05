import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RequirementGroupOverview action
 */
export interface msdyn_RequirementGroupOverviewResponse {
  Result: string;
}

/**
 * msdyn_RequirementGroupOverview action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_requirementgroup)
 */
export class msdyn_RequirementGroupOverviewAction implements Executable<msdyn_RequirementGroupOverviewResponse> {
  constructor(
    public readonly msdyn_requirementgroupId: string,
    public readonly start: string,
    public readonly end: string,
    public readonly duration: number,
    public readonly interval: number,
    public readonly resourceIdsFilter: string,
    public readonly overviewTypes: string,
    public readonly constraintBag: string,
    public readonly removeRedundantCrewCombinations: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_RequirementGroupOverview`;

    const body: Record<string, unknown> = {
      Start: this.start,
      End: this.end,
      Duration: this.duration,
      Interval: this.interval,
      ResourceIdsFilter: this.resourceIdsFilter,
      OverviewTypes: this.overviewTypes,
      ConstraintBag: this.constraintBag,
      RemoveRedundantCrewCombinations: this.removeRedundantCrewCombinations,
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

  async parseResponse(response: Response): Promise<msdyn_RequirementGroupOverviewResponse> {
    const data = await response.json();
    return data as msdyn_RequirementGroupOverviewResponse;
  }
}
