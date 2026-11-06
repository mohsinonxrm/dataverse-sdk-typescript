import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdyn_GetSwarmSkills request message
 *
 * Web API Action: msdyn_GetSwarmSkills
 */
export class msdyn_GetSwarmSkillsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSwarmSkillsResponse>
{
  constructor(public swarmObject: EntityReference | AnyEntityPayload) {
    super("msdyn_GetSwarmSkills");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmSkills`;

    const body: Record<string, unknown> = {
      SwarmObject: this.swarmObject,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmSkillsResponse> {
    const data = await response.json();
    return msdyn_GetSwarmSkillsResponse.fromResponse(data);
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
