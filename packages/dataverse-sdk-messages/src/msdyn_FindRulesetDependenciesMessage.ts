import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_FindRulesetDependenciesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FindRulesetDependencies action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FindRulesetDependenciesResult {
  "@odata.context"?: string;
  DependenciesJson: string;
}

/**
 * msdyn_FindRulesetDependencies response message
 *
 * `result` is the value the msdyn_FindRulesetDependencies action returns (see {@link msdyn_FindRulesetDependenciesResult}).
 */
export class msdyn_FindRulesetDependenciesResponse extends OrganizationResponse {
  constructor(public result: msdyn_FindRulesetDependenciesResult) {
    super("msdyn_FindRulesetDependencies");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FindRulesetDependenciesResponse {
    return new msdyn_FindRulesetDependenciesResponse(data as msdyn_FindRulesetDependenciesResult);
  }
}
