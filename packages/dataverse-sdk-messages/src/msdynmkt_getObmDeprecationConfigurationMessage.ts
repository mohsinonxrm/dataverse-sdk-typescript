import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdynmkt_getObmDeprecationConfigurationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdynmkt_getObmDeprecationConfiguration response message
 */
export class msdynmkt_getObmDeprecationConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getObmDeprecationConfigurationResponse) {
    super("msdynmkt_getObmDeprecationConfiguration");
  }

  static fromResponse(data: unknown): msdynmkt_getObmDeprecationConfigurationResponse {
    return new msdynmkt_getObmDeprecationConfigurationResponse((data as any).value);
  }
}
