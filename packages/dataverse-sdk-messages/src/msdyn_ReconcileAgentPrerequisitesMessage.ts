import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ReconcileAgentPrerequisites message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ReconcileAgentPrerequisitesRequestParameters {
  FeatureName: string;
  ProfileId?: string;
}

/**
 * msdyn_ReconcileAgentPrerequisites request message
 *
 * Web API Action: msdyn_ReconcileAgentPrerequisites
 */
export class msdyn_ReconcileAgentPrerequisitesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ReconcileAgentPrerequisitesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ReconcileAgentPrerequisitesRequestParameters>;

  constructor(parameters: msdyn_ReconcileAgentPrerequisitesRequestParameters) {
    super("msdyn_ReconcileAgentPrerequisites", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ReconcileAgentPrerequisites`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
      ProfileId: this.Parameters.ProfileId,
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

  async parseResponse(response: Response): Promise<msdyn_ReconcileAgentPrerequisitesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ReconcileAgentPrerequisitesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ReconcileAgentPrerequisites action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ReconcileAgentPrerequisitesResult {
  "@odata.context"?: string;
  ResponseJson: string;
  Success: boolean;
}

/**
 * msdyn_ReconcileAgentPrerequisites response message
 *
 * `result` is the value the msdyn_ReconcileAgentPrerequisites action returns (see {@link msdyn_ReconcileAgentPrerequisitesResult}).
 */
export class msdyn_ReconcileAgentPrerequisitesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ReconcileAgentPrerequisitesResult) {
    super("msdyn_ReconcileAgentPrerequisites");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ReconcileAgentPrerequisitesResponse {
    return new msdyn_ReconcileAgentPrerequisitesResponse(
      data as msdyn_ReconcileAgentPrerequisitesResult
    );
  }
}
