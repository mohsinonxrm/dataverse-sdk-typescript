import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_requirementgroup } from "./types/index.js";

/**
 * Response from msdyn_RetrieveRequirementGroupCandidates action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_RetrieveRequirementGroupCandidatesResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the msdyn_RetrieveRequirementGroupCandidates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveRequirementGroupCandidatesActionParameters {
  RequirementGroup?: EntityReference | EntityPayload<msdyn_requirementgroup>;
  StartTime: string;
  EndTime: string;
  Duration: number;
  ConstraintBag?: string;
  Version?: string;
}

/**
 * msdyn_RetrieveRequirementGroupCandidates action
 *
 * Unbound action
 */
export class msdyn_RetrieveRequirementGroupCandidatesAction implements Executable<msdyn_RetrieveRequirementGroupCandidatesResponse> {
  constructor(
    public readonly parameters: msdyn_RetrieveRequirementGroupCandidatesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveRequirementGroupCandidates`;

    const body = requestBody({
      RequirementGroup: this.parameters.RequirementGroup,
      StartTime: this.parameters.StartTime,
      EndTime: this.parameters.EndTime,
      Duration: this.parameters.Duration,
      ConstraintBag: this.parameters.ConstraintBag,
      Version: this.parameters.Version,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveRequirementGroupCandidatesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveRequirementGroupCandidatesResponse;
  }
}
