import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public version: string,
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDependencySetResponse> {
    const data = await response.json();
    return msdyn_GetRequirementDependencySetResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Version: this.version,
      RequirementIds: this.requirementIds,
    };
  }
}

/**
 * msdyn_GetRequirementDependencySet response message
 */
export class msdyn_GetRequirementDependencySetResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDependencySetResponse) {
    super("msdyn_GetRequirementDependencySet");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementDependencySetResponse {
    return new msdyn_GetRequirementDependencySetResponse((data as any).value);
  }
}
