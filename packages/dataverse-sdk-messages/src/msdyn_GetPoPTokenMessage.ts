import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetPoPTokenResponse as msdyn_GetPoPTokenResponseData } from "./types/index.js";

/**
 * msdyn_GetPoPToken request message
 *
 * Web API Action: msdyn_GetPoPToken
 */
export class msdyn_GetPoPTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPoPTokenResponse>
{
  constructor(
    public scope: string,
    public audience: string,
    public aadObjectId: string,
    public httpMethod: string,
    public secureString: string
  ) {
    super("msdyn_GetPoPToken");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPoPToken`;

    const body: Record<string, unknown> = {
      scope: this.scope,
      audience: this.audience,
      aadObjectId: this.aadObjectId,
      httpMethod: this.httpMethod,
      secureString: this.secureString,
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

  async parseResponse(response: Response): Promise<msdyn_GetPoPTokenResponse> {
    const data = await response.json();
    return msdyn_GetPoPTokenResponse.fromResponse(data);
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
