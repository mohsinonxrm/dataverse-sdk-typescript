import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_requirementgroup } from "./types/index.js";

/**
 * msdyn_RetrieveRequirementGroupCandidates request message
 *
 * Web API Action: msdyn_RetrieveRequirementGroupCandidates
 */
export class msdyn_RetrieveRequirementGroupCandidatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveRequirementGroupCandidatesResponse>
{
  constructor(
    public requirementGroup: msdyn_requirementgroup,
    public startTime: string,
    public endTime: string,
    public duration: number,
    public constraintBag: string,
    public version: string
  ) {
    super("msdyn_RetrieveRequirementGroupCandidates");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveRequirementGroupCandidates`;

    const body: Record<string, unknown> = {
      RequirementGroup: this.requirementGroup,
      StartTime: this.startTime,
      EndTime: this.endTime,
      Duration: this.duration,
      ConstraintBag: this.constraintBag,
      Version: this.version,
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
  ): Promise<msdyn_RetrieveRequirementGroupCandidatesResponse> {
    const data = await response.json();
    return msdyn_RetrieveRequirementGroupCandidatesResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveRequirementGroupCandidates response message
 */
export class msdyn_RetrieveRequirementGroupCandidatesResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_RetrieveRequirementGroupCandidates");
  }

  static fromResponse(data: unknown): msdyn_RetrieveRequirementGroupCandidatesResponse {
    return new msdyn_RetrieveRequirementGroupCandidatesResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
