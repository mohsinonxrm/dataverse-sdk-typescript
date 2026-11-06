import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_updatelivechatconfigs request message
 *
 * Web API Action: msdyn_updatelivechatconfigs
 */
export class msdyn_updatelivechatconfigsRequest
  extends OrganizationRequest
  implements Executable<msdyn_updatelivechatconfigsResponse>
{
  constructor() {
    super("msdyn_updatelivechatconfigs");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updatelivechatconfigs`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_updatelivechatconfigsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_updatelivechatconfigsResponse());
  }
}

/**
 * msdyn_updatelivechatconfigs response message
 */
export class msdyn_updatelivechatconfigsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_updatelivechatconfigs");
  }

  static fromResponse(_data?: unknown): msdyn_updatelivechatconfigsResponse {
    return new msdyn_updatelivechatconfigsResponse();
  }
}
