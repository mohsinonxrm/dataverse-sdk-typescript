import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateRequirementDemandResponse as msdyn_UpdateRequirementDemandResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateRequirementDemand message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRequirementDemandRequestParameters {
  RequirementDemandContext: string;
}

/**
 * msdyn_UpdateRequirementDemand request message
 *
 * Web API Action: msdyn_UpdateRequirementDemand
 */
export class msdyn_UpdateRequirementDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRequirementDemandResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateRequirementDemandRequestParameters>;

  constructor(parameters: msdyn_UpdateRequirementDemandRequestParameters) {
    super("msdyn_UpdateRequirementDemand", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementDemand`;

    const body = requestBody({
      RequirementDemandContext: this.Parameters.RequirementDemandContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRequirementDemandResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpdateRequirementDemandResponse.fromResponse({});
    return msdyn_UpdateRequirementDemandResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateRequirementDemand response message
 */
export class msdyn_UpdateRequirementDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateRequirementDemandResponseData) {
    super("msdyn_UpdateRequirementDemand");
  }

  static fromResponse(data: unknown): msdyn_UpdateRequirementDemandResponse {
    return new msdyn_UpdateRequirementDemandResponse(
      responseObject<msdyn_UpdateRequirementDemandResponseData>(data)
    );
  }
}
