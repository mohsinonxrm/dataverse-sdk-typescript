import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdateRequirementDemandResponse as msdyn_UpdateRequirementDemandResponseData } from "./types/index.js";

/**
 * msdyn_UpdateRequirementDemand request message
 *
 * Web API Action: msdyn_UpdateRequirementDemand
 */
export class msdyn_UpdateRequirementDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRequirementDemandResponse>
{
  constructor(public requirementDemandContext: string) {
    super("msdyn_UpdateRequirementDemand");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementDemand`;

    const body: Record<string, unknown> = {
      RequirementDemandContext: this.requirementDemandContext,
    };

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
    const data = await response.json();
    return msdyn_UpdateRequirementDemandResponse.fromResponse(data);
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
