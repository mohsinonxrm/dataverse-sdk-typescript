import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRequirementDemandResponse as msdyn_GetRequirementDemandResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetRequirementDemand message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementDemandRequestParameters {
  RequirementIds: string;
}

/**
 * msdyn_GetRequirementDemand request message
 *
 * Web API Action: msdyn_GetRequirementDemand
 */
export class msdyn_GetRequirementDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementDemandResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRequirementDemandRequestParameters>;

  constructor(parameters: msdyn_GetRequirementDemandRequestParameters) {
    super("msdyn_GetRequirementDemand", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemand`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetRequirementDemandResponse.fromResponse({});
    return msdyn_GetRequirementDemandResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetRequirementDemand response message
 */
export class msdyn_GetRequirementDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDemandResponseData) {
    super("msdyn_GetRequirementDemand");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementDemandResponse {
    return new msdyn_GetRequirementDemandResponse(
      responseObject<msdyn_GetRequirementDemandResponseData>(data)
    );
  }
}
