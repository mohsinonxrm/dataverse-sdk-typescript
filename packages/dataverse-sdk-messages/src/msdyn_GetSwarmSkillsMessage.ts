import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSwarmSkillsResponse.fromResponse({});
    return msdyn_GetSwarmSkillsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSwarmSkills response message
 */
export class msdyn_GetSwarmSkillsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetSwarmSkills");
  }

  static fromResponse(data: unknown): msdyn_GetSwarmSkillsResponse {
    return new msdyn_GetSwarmSkillsResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
