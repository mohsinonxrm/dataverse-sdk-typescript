import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAzureTokenResponse as msdyn_GetAzureTokenResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAzureToken message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAzureTokenRequestParameters {
  InputParameter: string;
}

/**
 * msdyn_GetAzureToken request message
 *
 * Web API Action: msdyn_GetAzureToken
 */
export class msdyn_GetAzureTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAzureTokenResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAzureTokenRequestParameters>;

  constructor(parameters: msdyn_GetAzureTokenRequestParameters) {
    super("msdyn_GetAzureToken", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAzureToken`;

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

  async parseResponse(response: Response): Promise<msdyn_GetAzureTokenResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetAzureTokenResponse.fromResponse({});
    return msdyn_GetAzureTokenResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAzureToken response message
 */
export class msdyn_GetAzureTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAzureTokenResponseData) {
    super("msdyn_GetAzureToken");
  }

  static fromResponse(data: unknown): msdyn_GetAzureTokenResponse {
    return new msdyn_GetAzureTokenResponse(responseObject<msdyn_GetAzureTokenResponseData>(data));
  }
}
