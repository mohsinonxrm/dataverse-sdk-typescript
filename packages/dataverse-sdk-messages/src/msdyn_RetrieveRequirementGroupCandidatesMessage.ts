import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RetrieveRequirementGroupCandidatesResponse.fromResponse({});
    return msdyn_RetrieveRequirementGroupCandidatesResponse.fromResponse(await response.json());
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
