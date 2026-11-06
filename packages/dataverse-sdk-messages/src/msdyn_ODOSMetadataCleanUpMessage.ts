import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ODOSMetadataCleanUp message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ODOSMetadataCleanUpRequestParameters {
  InputData: string;
}

/**
 * msdyn_ODOSMetadataCleanUp request message
 *
 * Web API Action: msdyn_ODOSMetadataCleanUp
 */
export class msdyn_ODOSMetadataCleanUpRequest
  extends OrganizationRequest
  implements Executable<msdyn_ODOSMetadataCleanUpResponse>
{
  declare readonly Parameters: Readonly<msdyn_ODOSMetadataCleanUpRequestParameters>;

  constructor(parameters: msdyn_ODOSMetadataCleanUpRequestParameters) {
    super("msdyn_ODOSMetadataCleanUp", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ODOSMetadataCleanUp`;

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

  async parseResponse(response: Response): Promise<msdyn_ODOSMetadataCleanUpResponse> {
    // No return value (204 No Content)
    return new msdyn_ODOSMetadataCleanUpResponse();
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
