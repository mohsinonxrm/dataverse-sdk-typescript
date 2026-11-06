import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetRequirementDependencySet message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementDependencySetRequestParameters {
  Version?: string;
  RequirementIds: string;
}

/**
 * msdyn_GetRequirementDependencySet request message
 *
 * Web API Action: msdyn_GetRequirementDependencySet
 */
export class msdyn_GetRequirementDependencySetRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementDependencySetResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRequirementDependencySetRequestParameters>;

  constructor(parameters: msdyn_GetRequirementDependencySetRequestParameters) {
    super("msdyn_GetRequirementDependencySet", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDependencySet`;

    const body = requestBody({
      Version: this.Parameters.Version,
      RequirementIds: this.Parameters.RequirementIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDependencySetResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetRequirementDependencySetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRequirementDependencySet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementDependencySetResult {
  "@odata.context"?: string;
  RequirementDependencySet: string;
}

/**
 * msdyn_GetRequirementDependencySet response message
 *
 * `result` is the value the msdyn_GetRequirementDependencySet action returns (see {@link msdyn_GetRequirementDependencySetResult}).
 */
export class msdyn_GetRequirementDependencySetResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDependencySetResult) {
    super("msdyn_GetRequirementDependencySet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRequirementDependencySetResponse {
    return new msdyn_GetRequirementDependencySetResponse(
      data as msdyn_GetRequirementDependencySetResult
    );
  }
}
