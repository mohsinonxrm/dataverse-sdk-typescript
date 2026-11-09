import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_getAppConfig request message
 *
 * Web API Action: msdyn_getAppConfig
 */
export class msdyn_getAppConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_getAppConfigResponse>
{
  constructor() {
    super("msdyn_getAppConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAppConfig`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_getAppConfigResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_getAppConfigResponse());
  }
}

/**
 * msdyn_getAppConfig response message
 */
export class msdyn_getAppConfigResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_getAppConfig");
  }

  static fromResponse(_data?: unknown): msdyn_getAppConfigResponse {
    return new msdyn_getAppConfigResponse();
  }
}
