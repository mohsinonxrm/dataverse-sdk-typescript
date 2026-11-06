import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetRequirementDependencySetResponse as msdyn_GetRequirementDependencySetResponseData } from "./types/index.js";

/**
 * msdyn_GetRequirementDependencySet request message
 *
 * Web API Action: msdyn_GetRequirementDependencySet
 */
export class msdyn_GetRequirementDependencySetRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementDependencySetResponse>
{
  constructor(
    public version: string | undefined,
    public requirementIds: string
  ) {
    super("msdyn_GetRequirementDependencySet");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDependencySet`;

    const body: Record<string, unknown> = {
      Version: this.version,
      RequirementIds: this.requirementIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDependencySetResponse> {
    const data = await response.json();
    return msdyn_GetRequirementDependencySetResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetRequirementDependencySet response message
 */
export class msdyn_GetRequirementDependencySetResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDependencySetResponseData) {
    super("msdyn_GetRequirementDependencySet");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementDependencySetResponse {
    return new msdyn_GetRequirementDependencySetResponse(
      responseObject<msdyn_GetRequirementDependencySetResponseData>(data)
    );
  }
}
