import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_FindRulesetDependencies request message
 *
 * Web API Action: msdyn_FindRulesetDependencies
 */
export class msdyn_FindRulesetDependenciesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FindRulesetDependenciesResponse>
{
  constructor(public inputEntityReference: EntityReference) {
    super("msdyn_FindRulesetDependencies");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FindRulesetDependencies`;

    const body: Record<string, unknown> = {
      InputEntityReference: this.inputEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_FindRulesetDependenciesResponse> {
    const data = await response.json();
    return msdyn_FindRulesetDependenciesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputEntityReference: this.inputEntityReference,
    };
  }
}

/**
 * msdyn_FindRulesetDependencies response message
 */
export class msdyn_FindRulesetDependenciesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FindRulesetDependenciesResponse) {
    super("msdyn_FindRulesetDependencies");
  }

  static fromResponse(data: unknown): msdyn_FindRulesetDependenciesResponse {
    return new msdyn_FindRulesetDependenciesResponse((data as any).value);
  }
}
