import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CleanUpActivityMappings request message
 *
 * Web API Action: msdyn_CleanUpActivityMappings
 */
export class msdyn_CleanUpActivityMappingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanUpActivityMappingsResponse>
{
  constructor(public inputData: string) {
    super("msdyn_CleanUpActivityMappings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpActivityMappings`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_CleanUpActivityMappingsResponse> {
    // No return value (204 No Content)
    return new msdyn_CleanUpActivityMappingsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
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
