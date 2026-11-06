import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_requirementgroup } from "./types/index.js";

/**
 * Response from the msdyn_RetrieveRequirementGroupCandidates action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_RetrieveRequirementGroupCandidatesResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_RetrieveRequirementGroupCandidatesResponse;
  }
}
