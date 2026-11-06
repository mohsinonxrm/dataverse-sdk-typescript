import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RemoveRequirementModel request message
 *
 * Web API Action: msdyn_RemoveRequirementModel
 */
export class msdyn_RemoveRequirementModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_RemoveRequirementModelResponse>
{
  constructor(public attributes: string) {
    super("msdyn_RemoveRequirementModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RemoveRequirementModel`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<msdyn_RemoveRequirementModelResponse> {
    // No return value (204 No Content)
    return new msdyn_RemoveRequirementModelResponse();
  }
}

/**
 * msdyn_RemoveRequirementModel response message
 */
export class msdyn_RemoveRequirementModelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RemoveRequirementModel");
  }

  static fromResponse(_data: unknown): msdyn_RemoveRequirementModelResponse {
    return new msdyn_RemoveRequirementModelResponse();
  }
}
