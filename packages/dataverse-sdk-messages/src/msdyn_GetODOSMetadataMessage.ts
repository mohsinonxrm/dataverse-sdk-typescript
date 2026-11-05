import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetODOSMetadataResponse as msdyn_GetODOSMetadataResponseData } from "./types/index.js";

/**
 * msdyn_GetODOSMetadata request message
 *
 * Web API Action: msdyn_GetODOSMetadata
 */
export class msdyn_GetODOSMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetODOSMetadataResponse>
{
  constructor() {
    super("msdyn_GetODOSMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetODOSMetadata`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetODOSMetadataResponse> {
    const data = await response.json();
    return msdyn_GetODOSMetadataResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetODOSMetadata response message
 */
export class msdyn_GetODOSMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetODOSMetadataResponseData) {
    super("msdyn_GetODOSMetadata");
  }

  static fromResponse(data: unknown): msdyn_GetODOSMetadataResponse {
    return new msdyn_GetODOSMetadataResponse(
      responseObject<msdyn_GetODOSMetadataResponseData>(data)
    );
  }
}
