import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ScheduleRequirementGroupResponse as msdyn_ScheduleRequirementGroupResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ScheduleRequirementGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ScheduleRequirementGroupRequestParameters {
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
 * msdyn_ScheduleRequirementGroup request message
 *
 * Web API Action: msdyn_ScheduleRequirementGroup
 *
 * The first argument is the id of the msdyn_requirementgroup record to call it on.
 */
export class msdyn_ScheduleRequirementGroupRequest
  extends OrganizationRequest
  implements Executable<msdyn_ScheduleRequirementGroupResponse>
{
  declare readonly Parameters: Readonly<msdyn_ScheduleRequirementGroupRequestParameters>;

  constructor(
    public msdyn_requirementgroupId: string,
    parameters: msdyn_ScheduleRequirementGroupRequestParameters
  ) {
    super("msdyn_ScheduleRequirementGroup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_ScheduleRequirementGroup`;

    const body = requestBody({
      Start: this.Parameters.Start,
      End: this.Parameters.End,
      Duration: this.Parameters.Duration,
      Interval: this.Parameters.Interval,
      ResultsPerInterval: this.Parameters.ResultsPerInterval,
      TeamsPerInterval: this.Parameters.TeamsPerInterval,
      SortOption: this.Parameters.SortOption,
      PageSize: this.Parameters.PageSize,
      PageNumber: this.Parameters.PageNumber,
      PagingCookie: this.Parameters.PagingCookie,
      ResourceIdsFilter: this.Parameters.ResourceIdsFilter,
      TeamIdsFilter: this.Parameters.TeamIdsFilter,
      IntervalsFilter: this.Parameters.IntervalsFilter,
      GetCandidates: this.Parameters.GetCandidates,
      OmitPositions: this.Parameters.OmitPositions,
      ConstraintBag: this.Parameters.ConstraintBag,
      RemoveRedundantCrewCombinations: this.Parameters.RemoveRedundantCrewCombinations,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ScheduleRequirementGroupResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ScheduleRequirementGroup response message
 */
export class msdyn_ScheduleRequirementGroupResponse extends OrganizationResponse {
  constructor(public result: msdyn_ScheduleRequirementGroupResponseData) {
    super("msdyn_ScheduleRequirementGroup");
  }

  static fromResponse(data: unknown): msdyn_ScheduleRequirementGroupResponse {
    return new msdyn_ScheduleRequirementGroupResponse(
      responseObject<msdyn_ScheduleRequirementGroupResponseData>(data)
    );
  }
}
