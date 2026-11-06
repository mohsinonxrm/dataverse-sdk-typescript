import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_FindRulesetDependenciesResponse as msdyn_FindRulesetDependenciesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FindRulesetDependencies message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FindRulesetDependenciesRequestParameters {
  InputEntityReference: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_FindRulesetDependencies request message
 *
 * Web API Action: msdyn_FindRulesetDependencies
 */
export class msdyn_FindRulesetDependenciesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FindRulesetDependenciesResponse>
{
  declare readonly Parameters: Readonly<msdyn_FindRulesetDependenciesRequestParameters>;

  constructor(parameters: msdyn_FindRulesetDependenciesRequestParameters) {
    super("msdyn_FindRulesetDependencies", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FindRulesetDependencies`;

    const body = requestBody({
      InputEntityReference: this.Parameters.InputEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_FindRulesetDependenciesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FindRulesetDependenciesResponse.fromResponse(text ? JSON.parse(text) : {});
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
