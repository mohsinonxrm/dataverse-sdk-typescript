import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DisableUnstructuredData request message
 *
 * Web API Action: msdyn_DisableUnstructuredData
 */
export class msdyn_DisableUnstructuredDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_DisableUnstructuredDataResponse>
{
  constructor() {
    super("msdyn_DisableUnstructuredData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisableUnstructuredData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DisableUnstructuredDataResponse> {
    // No return value (204 No Content)
    return new msdyn_DisableUnstructuredDataResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_DisableUnstructuredData response message
 */
export class msdyn_DisableUnstructuredDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DisableUnstructuredData");
  }

  static fromResponse(_data: unknown): msdyn_DisableUnstructuredDataResponse {
    return new msdyn_DisableUnstructuredDataResponse();
  }
}
