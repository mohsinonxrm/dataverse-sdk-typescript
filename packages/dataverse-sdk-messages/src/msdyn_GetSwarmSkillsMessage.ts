import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_GetSwarmSkills message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmSkillsRequestParameters {
  SwarmObject: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetSwarmSkills request message
 *
 * Web API Action: msdyn_GetSwarmSkills
 */
export class msdyn_GetSwarmSkillsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSwarmSkillsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSwarmSkillsRequestParameters>;

  constructor(parameters: msdyn_GetSwarmSkillsRequestParameters) {
    super("msdyn_GetSwarmSkills", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmSkills`;

    const body = requestBody({
      SwarmObject: this.Parameters.SwarmObject,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmSkillsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msdyn_GetSwarmSkillsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetSwarmSkillsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSwarmSkills action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetSwarmSkillsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetSwarmSkills response message
 *
 * `result` is the value the msdyn_GetSwarmSkills action returns (see {@link msdyn_GetSwarmSkillsResult}).
 */
export class msdyn_GetSwarmSkillsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmSkillsResult) {
    super("msdyn_GetSwarmSkills");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSwarmSkillsResponse {
    return new msdyn_GetSwarmSkillsResponse(
      data === undefined ? [] : (data as { value: msdyn_GetSwarmSkillsResult }).value
    );
  }
}
