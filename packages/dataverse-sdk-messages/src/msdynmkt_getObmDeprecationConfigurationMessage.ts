import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_getObmDeprecationConfigurationResponse as msdynmkt_getObmDeprecationConfigurationResponseData } from "./types/index.js";

/**
 * msdynmkt_getObmDeprecationConfiguration request message
 *
 * Web API Action: msdynmkt_getObmDeprecationConfiguration
 */
export class msdynmkt_getObmDeprecationConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getObmDeprecationConfigurationResponse>
{
  constructor() {
    super("msdynmkt_getObmDeprecationConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getObmDeprecationConfiguration`;

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
  ): Promise<msdynmkt_getObmDeprecationConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_getObmDeprecationConfigurationResponse.fromResponse({});
    return msdynmkt_getObmDeprecationConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_getObmDeprecationConfiguration response message
 */
export class msdynmkt_getObmDeprecationConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getObmDeprecationConfigurationResponseData) {
    super("msdynmkt_getObmDeprecationConfiguration");
  }

  static fromResponse(data: unknown): msdynmkt_getObmDeprecationConfigurationResponse {
    return new msdynmkt_getObmDeprecationConfigurationResponse(
      responseObject<msdynmkt_getObmDeprecationConfigurationResponseData>(data)
    );
  }
}
