import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CleanUpActivityMappings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanUpActivityMappingsRequestParameters {
  InputData?: string;
}

/**
 * msdyn_CleanUpActivityMappings request message
 *
 * Web API Action: msdyn_CleanUpActivityMappings
 */
export class msdyn_CleanUpActivityMappingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanUpActivityMappingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CleanUpActivityMappingsRequestParameters>;

  constructor(parameters: msdyn_CleanUpActivityMappingsRequestParameters = {}) {
    super("msdyn_CleanUpActivityMappings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpActivityMappings`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_CleanUpActivityMappingsResponse> {
    // No return value (204 No Content)
    return new msdyn_CleanUpActivityMappingsResponse();
  }
}

/**
 * msdyn_CleanUpActivityMappings response message
 */
export class msdyn_CleanUpActivityMappingsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CleanUpActivityMappings");
  }

  static fromResponse(_data: unknown): msdyn_CleanUpActivityMappingsResponse {
    return new msdyn_CleanUpActivityMappingsResponse();
  }
}
