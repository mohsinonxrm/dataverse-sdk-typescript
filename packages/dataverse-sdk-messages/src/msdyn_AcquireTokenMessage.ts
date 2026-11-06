import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AcquireTokenResponse as msdyn_AcquireTokenResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AcquireToken message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AcquireTokenRequestParameters {
  InputParameter: string;
}

/**
 * msdyn_AcquireToken request message
 *
 * Web API Action: msdyn_AcquireToken
 */
export class msdyn_AcquireTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_AcquireTokenResponse>
{
  declare readonly Parameters: Readonly<msdyn_AcquireTokenRequestParameters>;

  constructor(parameters: msdyn_AcquireTokenRequestParameters) {
    super("msdyn_AcquireToken", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcquireToken`;

    const body = requestBody({
      InputParameter: this.Parameters.InputParameter,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_AcquireTokenResponse.fromResponse({});
    return msdyn_AcquireTokenResponse.fromResponse(await response.json());
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
