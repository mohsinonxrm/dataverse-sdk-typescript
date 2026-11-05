import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_FindRulesetDependenciesResponse as msdyn_FindRulesetDependenciesResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FindRulesetDependenciesResponse> {
    const data = await response.json();
    return msdyn_FindRulesetDependenciesResponse.fromResponse(data);
  }
}

/**
 * msdyn_FindRulesetDependencies response message
 */
export class msdyn_FindRulesetDependenciesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FindRulesetDependenciesResponseData) {
    super("msdyn_FindRulesetDependencies");
  }

  static fromResponse(data: unknown): msdyn_FindRulesetDependenciesResponse {
    return new msdyn_FindRulesetDependenciesResponse(
      responseObject<msdyn_FindRulesetDependenciesResponseData>(data)
    );
  }
}
