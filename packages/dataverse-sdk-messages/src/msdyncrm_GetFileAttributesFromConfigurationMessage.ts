import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyncrm_GetFileAttributesFromConfigurationResponse as msdyncrm_GetFileAttributesFromConfigurationResponseData } from "./types/index.js";

/**
 * msdyncrm_GetFileAttributesFromConfiguration request message
 *
 * Web API Action: msdyncrm_GetFileAttributesFromConfiguration
 */
export class msdyncrm_GetFileAttributesFromConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyncrm_GetFileAttributesFromConfigurationResponse>
{
  constructor() {
    super("msdyncrm_GetFileAttributesFromConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_GetFileAttributesFromConfiguration`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyncrm_GetFileAttributesFromConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyncrm_GetFileAttributesFromConfigurationResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyncrm_GetFileAttributesFromConfiguration response message
 */
export class msdyncrm_GetFileAttributesFromConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyncrm_GetFileAttributesFromConfigurationResponseData) {
    super("msdyncrm_GetFileAttributesFromConfiguration");
  }

  static fromResponse(data: unknown): msdyncrm_GetFileAttributesFromConfigurationResponse {
    return new msdyncrm_GetFileAttributesFromConfigurationResponse(
      responseObject<msdyncrm_GetFileAttributesFromConfigurationResponseData>(data)
    );
  }
}
