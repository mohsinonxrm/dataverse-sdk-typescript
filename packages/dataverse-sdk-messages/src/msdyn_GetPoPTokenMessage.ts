import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetPoPTokenResponse as msdyn_GetPoPTokenResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetPoPToken message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPoPTokenRequestParameters {
  scope: string;
  audience: string;
  aadObjectId: string;
  httpMethod: string;
  secureString: string;
}

/**
 * msdyn_GetPoPToken request message
 *
 * Web API Action: msdyn_GetPoPToken
 */
export class msdyn_GetPoPTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPoPTokenResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetPoPTokenRequestParameters>;

  constructor(parameters: msdyn_GetPoPTokenRequestParameters) {
    super("msdyn_GetPoPToken", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPoPToken`;

    const body = requestBody({
      scope: this.Parameters.scope,
      audience: this.Parameters.audience,
      aadObjectId: this.Parameters.aadObjectId,
      httpMethod: this.Parameters.httpMethod,
      secureString: this.Parameters.secureString,
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

  async parseResponse(response: Response): Promise<msdyn_GetPoPTokenResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetPoPTokenResponse.fromResponse({});
    return msdyn_GetPoPTokenResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetPoPToken response message
 */
export class msdyn_GetPoPTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPoPTokenResponseData) {
    super("msdyn_GetPoPToken");
  }

  static fromResponse(data: unknown): msdyn_GetPoPTokenResponse {
    return new msdyn_GetPoPTokenResponse(responseObject<msdyn_GetPoPTokenResponseData>(data));
  }
}
