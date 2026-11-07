import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgent_RetrieveAgentProfiles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_RetrieveAgentProfilesRequestParameters {
  FeatureName?: string;
}

/**
 * msdyn_SalesAgent_RetrieveAgentProfiles request message
 *
 * Web API Action: msdyn_SalesAgent_RetrieveAgentProfiles
 */
export class msdyn_SalesAgent_RetrieveAgentProfilesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgent_RetrieveAgentProfilesResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgent_RetrieveAgentProfilesRequestParameters>;

  constructor(parameters: msdyn_SalesAgent_RetrieveAgentProfilesRequestParameters = {}) {
    super("msdyn_SalesAgent_RetrieveAgentProfiles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_RetrieveAgentProfiles`;

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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_RetrieveAgentProfilesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgent_RetrieveAgentProfilesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgent_RetrieveAgentProfiles action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_RetrieveAgentProfilesResult {
  "@odata.context"?: string;
  Message: string;
  ResponseJson: string;
  Success: boolean;
}

/**
 * msdyn_SalesAgent_RetrieveAgentProfiles response message
 *
 * `result` is the value the msdyn_SalesAgent_RetrieveAgentProfiles action returns (see {@link msdyn_SalesAgent_RetrieveAgentProfilesResult}).
 */
export class msdyn_SalesAgent_RetrieveAgentProfilesResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_RetrieveAgentProfilesResult) {
    super("msdyn_SalesAgent_RetrieveAgentProfiles");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgent_RetrieveAgentProfilesResponse {
    return new msdyn_SalesAgent_RetrieveAgentProfilesResponse(
      data as msdyn_SalesAgent_RetrieveAgentProfilesResult
    );
  }
}
