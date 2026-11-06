import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateRequirementModel request message
 *
 * Web API Action: msdyn_UpdateRequirementModel
 */
export class msdyn_UpdateRequirementModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRequirementModelResponse>
{
  constructor(
    public from: string,
    public to: string,
    public requirementGroupId: string,
    public attributes: string
  ) {
    super("msdyn_UpdateRequirementModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementModel`;

    const body: Record<string, unknown> = {
      From: this.from,
      To: this.to,
      RequirementGroupId: this.requirementGroupId,
      Attributes: this.attributes,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRequirementModelResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateRequirementModelResponse();
  }
}

/**
 * msdyn_UpdateRequirementModel response message
 */
export class msdyn_UpdateRequirementModelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateRequirementModel");
  }

  static fromResponse(_data: unknown): msdyn_UpdateRequirementModelResponse {
    return new msdyn_UpdateRequirementModelResponse();
  }
}
