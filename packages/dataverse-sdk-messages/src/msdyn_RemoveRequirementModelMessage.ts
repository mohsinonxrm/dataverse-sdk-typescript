import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RemoveRequirementModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RemoveRequirementModelRequestParameters {
  Attributes: string;
}

/**
 * msdyn_RemoveRequirementModel request message
 *
 * Web API Action: msdyn_RemoveRequirementModel
 */
export class msdyn_RemoveRequirementModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_RemoveRequirementModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_RemoveRequirementModelRequestParameters>;

  constructor(parameters: msdyn_RemoveRequirementModelRequestParameters) {
    super("msdyn_RemoveRequirementModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RemoveRequirementModel`;

    const body = requestBody({
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
