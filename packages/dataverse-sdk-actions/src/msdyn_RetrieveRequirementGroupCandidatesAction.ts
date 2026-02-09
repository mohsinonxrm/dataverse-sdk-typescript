import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { msdyn_requirementgroup } from "./types/index.js";

/**
 * Response from msdyn_RetrieveRequirementGroupCandidates action
 */
export interface msdyn_RetrieveRequirementGroupCandidatesResponse {
  value: EntityReference;
}

/**
 * msdyn_RetrieveRequirementGroupCandidates action
 *
 * Unbound action
 */
export class msdyn_RetrieveRequirementGroupCandidatesAction implements Executable<msdyn_RetrieveRequirementGroupCandidatesResponse> {
  constructor(
    public readonly requirementGroup: msdyn_requirementgroup,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly duration: number,
    public readonly constraintBag: string,
    public readonly version: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveRequirementGroupCandidatesResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveRequirementGroupCandidatesResponse;
  }
}
