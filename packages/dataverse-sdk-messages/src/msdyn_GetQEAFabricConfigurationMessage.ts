import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetQEAFabricConfigurationResponse as msdyn_GetQEAFabricConfigurationResponseData } from "./types/index.js";

/**
 * msdyn_GetQEAFabricConfiguration request message
 *
 * Web API Action: msdyn_GetQEAFabricConfiguration
 */
export class msdyn_GetQEAFabricConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetQEAFabricConfigurationResponse>
{
  constructor() {
    super("msdyn_GetQEAFabricConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetQEAFabricConfiguration`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetQEAFabricConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetQEAFabricConfigurationResponse.fromResponse({});
    return msdyn_GetQEAFabricConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetQEAFabricConfiguration response message
 */
export class msdyn_GetQEAFabricConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetQEAFabricConfigurationResponseData) {
    super("msdyn_GetQEAFabricConfiguration");
  }

  static fromResponse(data: unknown): msdyn_GetQEAFabricConfigurationResponse {
    return new msdyn_GetQEAFabricConfigurationResponse(
      responseObject<msdyn_GetQEAFabricConfigurationResponseData>(data)
    );
  }
}
