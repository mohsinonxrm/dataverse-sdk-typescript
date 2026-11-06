import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ReconcileAgentPrerequisitesResponse as msdyn_ReconcileAgentPrerequisitesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ReconcileAgentPrerequisitesResponse.fromResponse({});
    return msdyn_ReconcileAgentPrerequisitesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ReconcileAgentPrerequisites response message
 */
export class msdyn_ReconcileAgentPrerequisitesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ReconcileAgentPrerequisitesResponseData) {
    super("msdyn_ReconcileAgentPrerequisites");
  }

  static fromResponse(data: unknown): msdyn_ReconcileAgentPrerequisitesResponse {
    return new msdyn_ReconcileAgentPrerequisitesResponse(
      responseObject<msdyn_ReconcileAgentPrerequisitesResponseData>(data)
    );
  }
}
