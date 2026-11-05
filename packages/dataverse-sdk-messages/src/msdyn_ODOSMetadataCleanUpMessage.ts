import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ODOSMetadataCleanUp request message
 *
 * Web API Action: msdyn_ODOSMetadataCleanUp
 */
export class msdyn_ODOSMetadataCleanUpRequest
  extends OrganizationRequest
  implements Executable<msdyn_ODOSMetadataCleanUpResponse>
{
  constructor(public inputData: string) {
    super("msdyn_ODOSMetadataCleanUp");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ODOSMetadataCleanUp`;

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

  async parseResponse(response: Response): Promise<msdyn_ODOSMetadataCleanUpResponse> {
    // No return value (204 No Content)
    return new msdyn_ODOSMetadataCleanUpResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_ODOSMetadataCleanUp response message
 */
export class msdyn_ODOSMetadataCleanUpResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ODOSMetadataCleanUp");
  }

  static fromResponse(_data: unknown): msdyn_ODOSMetadataCleanUpResponse {
    return new msdyn_ODOSMetadataCleanUpResponse();
  }
}
