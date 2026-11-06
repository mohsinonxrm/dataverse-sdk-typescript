import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ScheduleRequirementGroup action
 */
export interface msdyn_ScheduleRequirementGroupResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_ScheduleRequirementGroup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ScheduleRequirementGroupActionParameters {
  Start: string;
  End: string;
  Duration?: number;
  Interval?: number;
  ResultsPerInterval?: number;
  TeamsPerInterval?: number;
  SortOption?: number;
  PageSize?: number;
  PageNumber?: number;
  PagingCookie?: string;
  ResourceIdsFilter?: string;
  TeamIdsFilter?: string;
  IntervalsFilter?: string;
  GetCandidates?: boolean;
  OmitPositions?: boolean;
  ConstraintBag?: string;
  RemoveRedundantCrewCombinations?: boolean;
}

/**
 * msdyn_ScheduleRequirementGroup action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_requirementgroup)
 *
 * The first argument is the id of the msdyn_requirementgroup record to call it on.
 */
export class msdyn_ScheduleRequirementGroupAction implements Executable<msdyn_ScheduleRequirementGroupResponse> {
  constructor(
    public readonly msdyn_requirementgroupId: string,
    public readonly parameters: msdyn_ScheduleRequirementGroupActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_ScheduleRequirementGroup`;

    const body = requestBody({
      Start: this.parameters.Start,
      End: this.parameters.End,
      Duration: this.parameters.Duration,
      Interval: this.parameters.Interval,
      ResultsPerInterval: this.parameters.ResultsPerInterval,
      TeamsPerInterval: this.parameters.TeamsPerInterval,
      SortOption: this.parameters.SortOption,
      PageSize: this.parameters.PageSize,
      PageNumber: this.parameters.PageNumber,
      PagingCookie: this.parameters.PagingCookie,
      ResourceIdsFilter: this.parameters.ResourceIdsFilter,
      TeamIdsFilter: this.parameters.TeamIdsFilter,
      IntervalsFilter: this.parameters.IntervalsFilter,
      GetCandidates: this.parameters.GetCandidates,
      OmitPositions: this.parameters.OmitPositions,
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

  async parseResponse(response: Response): Promise<msdyn_ScheduleRequirementGroupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ScheduleRequirementGroupResponse;
    return (await response.json()) as msdyn_ScheduleRequirementGroupResponse;
  }
}
