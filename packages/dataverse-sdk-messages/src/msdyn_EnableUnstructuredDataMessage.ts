import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EnableUnstructuredData request message
 *
 * Web API Action: msdyn_EnableUnstructuredData
 */
export class msdyn_EnableUnstructuredDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableUnstructuredDataResponse>
{
  constructor() {
    super("msdyn_EnableUnstructuredData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableUnstructuredData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_EnableUnstructuredDataResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_EnableUnstructuredDataResponse());
  }
}

/**
 * msdyn_EnableUnstructuredData response message
 */
export class msdyn_EnableUnstructuredDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_EnableUnstructuredData");
  }

  static fromResponse(_data?: unknown): msdyn_EnableUnstructuredDataResponse {
    return new msdyn_EnableUnstructuredDataResponse();
  }
}
