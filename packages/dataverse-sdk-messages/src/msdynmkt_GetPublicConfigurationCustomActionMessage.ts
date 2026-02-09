import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_GetPublicConfigurationCustomAction request message
 *
 * Web API Action: msdynmkt_GetPublicConfigurationCustomAction
 */
export class msdynmkt_GetPublicConfigurationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetPublicConfigurationCustomActionResponse>
{
  constructor() {
    super("msdynmkt_GetPublicConfigurationCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetPublicConfigurationCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_GetPublicConfigurationCustomActionResponse> {
    // No return value (204 No Content)
    return new msdynmkt_GetPublicConfigurationCustomActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdynmkt_GetPublicConfigurationCustomAction response message
 */
export class msdynmkt_GetPublicConfigurationCustomActionResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_GetPublicConfigurationCustomAction");
  }

  static fromResponse(_data: unknown): msdynmkt_GetPublicConfigurationCustomActionResponse {
    return new msdynmkt_GetPublicConfigurationCustomActionResponse();
  }
}
