import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetPoPTokenResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetPoPToken action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPoPTokenResult {
  "@odata.context"?: string;
  popToken: string;
}

/**
 * msdyn_GetPoPToken response message
 *
 * `result` is the value the msdyn_GetPoPToken action returns (see {@link msdyn_GetPoPTokenResult}).
 */
export class msdyn_GetPoPTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPoPTokenResult) {
    super("msdyn_GetPoPToken");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetPoPTokenResponse {
    return new msdyn_GetPoPTokenResponse(data as msdyn_GetPoPTokenResult);
  }
}
