import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetODOSFeatureEnabledRoles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetODOSFeatureEnabledRolesRequestParameters {
  FeatureName: string;
}

/**
 * msdyn_GetODOSFeatureEnabledRoles request message
 *
 * Web API Action: msdyn_GetODOSFeatureEnabledRoles
 */
export class msdyn_GetODOSFeatureEnabledRolesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetODOSFeatureEnabledRolesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetODOSFeatureEnabledRolesRequestParameters>;

  constructor(parameters: msdyn_GetODOSFeatureEnabledRolesRequestParameters) {
    super("msdyn_GetODOSFeatureEnabledRoles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSFeatureEnabledRoles`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetODOSFeatureEnabledRolesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetODOSFeatureEnabledRolesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetODOSFeatureEnabledRoles action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetODOSFeatureEnabledRolesResult {
  "@odata.context"?: string;
  Roles: string;
}

/**
 * msdyn_GetODOSFeatureEnabledRoles response message
 *
 * `result` is the value the msdyn_GetODOSFeatureEnabledRoles action returns (see {@link msdyn_GetODOSFeatureEnabledRolesResult}).
 */
export class msdyn_GetODOSFeatureEnabledRolesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSFeatureEnabledRolesResult) {
    super("msdyn_GetODOSFeatureEnabledRoles");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetODOSFeatureEnabledRolesResponse {
    return new msdyn_GetODOSFeatureEnabledRolesResponse(
      data as msdyn_GetODOSFeatureEnabledRolesResult
    );
  }
}
