import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SwarmExpertFinder request message
 *
 * Web API Action: msdyn_SwarmExpertFinder
 */
export class msdyn_SwarmExpertFinderRequest
  extends OrganizationRequest
  implements Executable<msdyn_SwarmExpertFinderResponse>
{
  constructor(
    public skillList: Record<string, unknown>[],
    public swarmId: string
  ) {
    super("msdyn_SwarmExpertFinder");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SwarmExpertFinder`;

    const body: Record<string, unknown> = {
      SkillList: this.skillList,
      SwarmId: this.swarmId,
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

  async parseResponse(response: Response): Promise<msdyn_SwarmExpertFinderResponse> {
    // No return value (204 No Content)
    return new msdyn_SwarmExpertFinderResponse();
  }
}

/**
 * msdyn_SwarmExpertFinder response message
 */
export class msdyn_SwarmExpertFinderResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SwarmExpertFinder");
  }

  static fromResponse(_data: unknown): msdyn_SwarmExpertFinderResponse {
    return new msdyn_SwarmExpertFinderResponse();
  }
}
