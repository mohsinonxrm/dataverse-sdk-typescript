import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ScheduleRequirementGroup action
 */
export interface msdyn_ScheduleRequirementGroupResponse {
  Result: string;
}

/**
 * msdyn_ScheduleRequirementGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_requirementgroup)
 */
export class msdyn_ScheduleRequirementGroupAction implements Executable<msdyn_ScheduleRequirementGroupResponse> {
  constructor(
    public readonly msdyn_requirementgroupId: string,
    public readonly start: string,
    public readonly end: string,
    public readonly duration: number,
    public readonly interval: number,
    public readonly resultsPerInterval: number,
    public readonly teamsPerInterval: number,
    public readonly sortOption: number,
    public readonly pageSize: number,
    public readonly pageNumber: number,
    public readonly pagingCookie: string,
    public readonly resourceIdsFilter: string,
    public readonly teamIdsFilter: string,
    public readonly intervalsFilter: string,
    public readonly getCandidates: boolean,
    public readonly omitPositions: boolean,
    public readonly constraintBag: string,
    public readonly removeRedundantCrewCombinations: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_ScheduleRequirementGroup`;

    const body: Record<string, unknown> = {
      Start: this.start,
      End: this.end,
      Duration: this.duration,
      Interval: this.interval,
      ResultsPerInterval: this.resultsPerInterval,
      TeamsPerInterval: this.teamsPerInterval,
      SortOption: this.sortOption,
      PageSize: this.pageSize,
      PageNumber: this.pageNumber,
      PagingCookie: this.pagingCookie,
      ResourceIdsFilter: this.resourceIdsFilter,
      TeamIdsFilter: this.teamIdsFilter,
      IntervalsFilter: this.intervalsFilter,
      GetCandidates: this.getCandidates,
      OmitPositions: this.omitPositions,
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

  async parseResponse(response: Response): Promise<msdyn_ScheduleRequirementGroupResponse> {
    const data = await response.json();
    return data as msdyn_ScheduleRequirementGroupResponse;
  }
}
