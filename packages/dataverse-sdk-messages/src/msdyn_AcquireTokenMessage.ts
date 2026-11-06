import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_AcquireTokenResponse as msdyn_AcquireTokenResponseData } from "./types/index.js";

/**
 * msdyn_AcquireToken request message
 *
 * Web API Action: msdyn_AcquireToken
 */
export class msdyn_AcquireTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_AcquireTokenResponse>
{
  constructor(public inputParameter: string) {
    super("msdyn_AcquireToken");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcquireToken`;

    const body: Record<string, unknown> = {
      InputParameter: this.inputParameter,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AcquireTokenResponse> {
    const data = await response.json();
    return msdyn_AcquireTokenResponse.fromResponse(data);
  }
}

/**
 * msdyn_AcquireToken response message
 */
export class msdyn_AcquireTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_AcquireTokenResponseData) {
    super("msdyn_AcquireToken");
  }

  static fromResponse(data: unknown): msdyn_AcquireTokenResponse {
    return new msdyn_AcquireTokenResponse(responseObject<msdyn_AcquireTokenResponseData>(data));
  }
}
