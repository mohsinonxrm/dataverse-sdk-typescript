import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SwarmExpertFinder message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SwarmExpertFinderRequestParameters {
  SkillList: Record<string, unknown>[];
  SwarmId: string;
}

/**
 * msdyn_SwarmExpertFinder request message
 *
 * Web API Action: msdyn_SwarmExpertFinder
 */
export class msdyn_SwarmExpertFinderRequest
  extends OrganizationRequest
  implements Executable<msdyn_SwarmExpertFinderResponse>
{
  declare readonly Parameters: Readonly<msdyn_SwarmExpertFinderRequestParameters>;

  constructor(parameters: msdyn_SwarmExpertFinderRequestParameters) {
    super("msdyn_SwarmExpertFinder", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SwarmExpertFinder`;

    const body = requestBody({
      SkillList: this.Parameters.SkillList,
      SwarmId: this.Parameters.SwarmId,
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

  parseResponse(_response: Response): Promise<msdyn_SwarmExpertFinderResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SwarmExpertFinderResponse());
  }
}

/**
 * msdyn_SwarmExpertFinder response message
 */
export class msdyn_SwarmExpertFinderResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SwarmExpertFinder");
  }

  static fromResponse(_data?: unknown): msdyn_SwarmExpertFinderResponse {
    return new msdyn_SwarmExpertFinderResponse();
  }
}
