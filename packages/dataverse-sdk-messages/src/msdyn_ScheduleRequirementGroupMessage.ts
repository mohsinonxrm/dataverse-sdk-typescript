import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ScheduleRequirementGroup request message
 *
 * Web API Action: msdyn_ScheduleRequirementGroup
 */
export class msdyn_ScheduleRequirementGroupRequest
  extends OrganizationRequest
  implements Executable<msdyn_ScheduleRequirementGroupResponse>
{
  constructor(
    public msdyn_requirementgroupId: string,
    public start: string,
    public end: string,
    public duration: number,
    public interval: number,
    public resultsPerInterval: number,
    public teamsPerInterval: number,
    public sortOption: number,
    public pageSize: number,
    public pageNumber: number,
    public pagingCookie: string,
    public resourceIdsFilter: string,
    public teamIdsFilter: string,
    public intervalsFilter: string,
    public getCandidates: boolean,
    public omitPositions: boolean,
    public constraintBag: string,
    public removeRedundantCrewCombinations: boolean
  ) {
    super("msdyn_ScheduleRequirementGroup");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ScheduleRequirementGroupResponse> {
    const data = await response.json();
    return msdyn_ScheduleRequirementGroupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_requirementgroupId,
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
  }
}

/**
 * msdyn_ScheduleRequirementGroup response message
 */
export class msdyn_ScheduleRequirementGroupResponse extends OrganizationResponse {
  constructor(public result: msdyn_ScheduleRequirementGroupResponse) {
    super("msdyn_ScheduleRequirementGroup");
  }

  static fromResponse(data: unknown): msdyn_ScheduleRequirementGroupResponse {
    return new msdyn_ScheduleRequirementGroupResponse((data as any).value);
  }
}
