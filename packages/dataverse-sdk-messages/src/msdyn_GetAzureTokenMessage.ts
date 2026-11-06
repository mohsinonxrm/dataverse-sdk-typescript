import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAzureTokenResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAzureToken action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAzureTokenResult {
  "@odata.context"?: string;
  ExceptionMessage: string;
  Result: string;
}

/**
 * msdyn_GetAzureToken response message
 *
 * `result` is the value the msdyn_GetAzureToken action returns (see {@link msdyn_GetAzureTokenResult}).
 */
export class msdyn_GetAzureTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAzureTokenResult) {
    super("msdyn_GetAzureToken");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAzureTokenResponse {
    return new msdyn_GetAzureTokenResponse(data as msdyn_GetAzureTokenResult);
  }
}
