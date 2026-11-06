import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RequirementGroupOverview message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RequirementGroupOverviewRequestParameters {
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
 * msdyn_RequirementGroupOverview request message
 *
 * Web API Action: msdyn_RequirementGroupOverview
 *
 * The first argument is the id of the msdyn_requirementgroup record to call it on.
 */
export class msdyn_RequirementGroupOverviewRequest
  extends OrganizationRequest
  implements Executable<msdyn_RequirementGroupOverviewResponse>
{
  declare readonly Parameters: Readonly<msdyn_RequirementGroupOverviewRequestParameters>;

  constructor(
    public msdyn_requirementgroupId: string,
    parameters: msdyn_RequirementGroupOverviewRequestParameters = {}
  ) {
    super("msdyn_RequirementGroupOverview", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_requirementgroups(${this.msdyn_requirementgroupId})/Microsoft.Dynamics.CRM.msdyn_RequirementGroupOverview`;

    const body = requestBody({
      Start: this.Parameters.Start,
      End: this.Parameters.End,
      Duration: this.Parameters.Duration,
      Interval: this.Parameters.Interval,
      ResourceIdsFilter: this.Parameters.ResourceIdsFilter,
      OverviewTypes: this.Parameters.OverviewTypes,
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

  async parseResponse(response: Response): Promise<msdyn_RequirementGroupOverviewResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RequirementGroupOverviewResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RequirementGroupOverview action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RequirementGroupOverviewResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RequirementGroupOverview response message
 *
 * `result` is the value the msdyn_RequirementGroupOverview action returns (see {@link msdyn_RequirementGroupOverviewResult}).
 */
export class msdyn_RequirementGroupOverviewResponse extends OrganizationResponse {
  constructor(public result: msdyn_RequirementGroupOverviewResult) {
    super("msdyn_RequirementGroupOverview");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RequirementGroupOverviewResponse {
    return new msdyn_RequirementGroupOverviewResponse(data as msdyn_RequirementGroupOverviewResult);
  }
}
