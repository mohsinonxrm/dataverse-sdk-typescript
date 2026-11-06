import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRequirementDependencySetResponse as msdyn_GetRequirementDependencySetResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetRequirementDependencySetResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetRequirementDependencySet response message
 */
export class msdyn_GetRequirementDependencySetResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDependencySetResponseData) {
    super("msdyn_GetRequirementDependencySet");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementDependencySetResponse {
    return new msdyn_GetRequirementDependencySetResponse(
      responseObject<msdyn_GetRequirementDependencySetResponseData>(data)
    );
  }
}
