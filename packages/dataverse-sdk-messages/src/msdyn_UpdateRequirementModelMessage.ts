import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateRequirementModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRequirementModelRequestParameters {
  From?: string;
  To?: string;
  RequirementGroupId?: string;
  Attributes: string;
}

/**
 * msdyn_UpdateRequirementModel request message
 *
 * Web API Action: msdyn_UpdateRequirementModel
 */
export class msdyn_UpdateRequirementModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRequirementModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateRequirementModelRequestParameters>;

  constructor(parameters: msdyn_UpdateRequirementModelRequestParameters) {
    super("msdyn_UpdateRequirementModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementModel`;

    const body = requestBody({
      From: this.Parameters.From,
      To: this.Parameters.To,
      RequirementGroupId: this.Parameters.RequirementGroupId,
      Attributes: this.Parameters.Attributes,
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
