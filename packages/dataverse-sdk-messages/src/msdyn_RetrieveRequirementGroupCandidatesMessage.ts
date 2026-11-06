import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_requirementgroup } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveRequirementGroupCandidates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveRequirementGroupCandidatesRequestParameters {
  RequirementGroup?: EntityReference | EntityPayload<msdyn_requirementgroup>;
  StartTime: string;
  EndTime: string;
  Duration: number;
  ConstraintBag?: string;
  Version?: string;
}

/**
 * msdyn_RetrieveRequirementGroupCandidates request message
 *
 * Web API Action: msdyn_RetrieveRequirementGroupCandidates
 */
export class msdyn_RetrieveRequirementGroupCandidatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveRequirementGroupCandidatesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveRequirementGroupCandidatesRequestParameters>;

  constructor(parameters: msdyn_RetrieveRequirementGroupCandidatesRequestParameters) {
    super("msdyn_RetrieveRequirementGroupCandidates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveRequirementGroupCandidates`;

    const body = requestBody({
      RequirementGroup: this.Parameters.RequirementGroup,
      StartTime: this.Parameters.StartTime,
      EndTime: this.Parameters.EndTime,
      Duration: this.Parameters.Duration,
      ConstraintBag: this.Parameters.ConstraintBag,
      Version: this.Parameters.Version,
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
    if (response.status === 204)
      return msdyn_RetrieveRequirementGroupCandidatesResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_RetrieveRequirementGroupCandidatesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveRequirementGroupCandidates action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_RetrieveRequirementGroupCandidatesResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_RetrieveRequirementGroupCandidates response message
 *
 * `result` is the value the msdyn_RetrieveRequirementGroupCandidates action returns (see {@link msdyn_RetrieveRequirementGroupCandidatesResult}).
 */
export class msdyn_RetrieveRequirementGroupCandidatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveRequirementGroupCandidatesResult) {
    super("msdyn_RetrieveRequirementGroupCandidates");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveRequirementGroupCandidatesResponse {
    return new msdyn_RetrieveRequirementGroupCandidatesResponse(
      (data ?? null) as msdyn_RetrieveRequirementGroupCandidatesResult
    );
  }
}
