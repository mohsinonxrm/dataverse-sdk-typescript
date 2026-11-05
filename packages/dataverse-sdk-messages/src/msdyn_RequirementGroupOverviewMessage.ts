import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RequirementGroupOverview request message
 *
 * Web API Action: msdyn_RequirementGroupOverview
 */
export class msdyn_RequirementGroupOverviewRequest
  extends OrganizationRequest
  implements Executable<msdyn_RequirementGroupOverviewResponse>
{
  constructor(
    public msdyn_requirementgroupId: string,
    public start: string,
    public end: string,
    public duration: number,
    public interval: number,
    public resourceIdsFilter: string,
    public overviewTypes: string,
    public constraintBag: string,
    public removeRedundantCrewCombinations: boolean
  ) {
    super("msdyn_RequirementGroupOverview");
  }

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
    return msdyn_RequirementGroupOverviewResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_requirementgroupId,
      Start: this.start,
      End: this.end,
      Duration: this.duration,
      Interval: this.interval,
      ResourceIdsFilter: this.resourceIdsFilter,
      OverviewTypes: this.overviewTypes,
      ConstraintBag: this.constraintBag,
      RemoveRedundantCrewCombinations: this.removeRedundantCrewCombinations,
    };
  }
}

/**
 * msdyn_RequirementGroupOverview response message
 */
export class msdyn_RequirementGroupOverviewResponse extends OrganizationResponse {
  constructor(public result: msdyn_RequirementGroupOverviewResponse) {
    super("msdyn_RequirementGroupOverview");
  }

  static fromResponse(data: unknown): msdyn_RequirementGroupOverviewResponse {
    return new msdyn_RequirementGroupOverviewResponse((data as any).value);
  }
}
