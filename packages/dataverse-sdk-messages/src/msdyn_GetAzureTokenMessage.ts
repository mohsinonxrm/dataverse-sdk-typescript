import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetAzureToken request message
 *
 * Web API Action: msdyn_GetAzureToken
 */
export class msdyn_GetAzureTokenRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAzureTokenResponse>
{
  constructor(public inputParameter: string) {
    super("msdyn_GetAzureToken");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAzureToken`;

    const body: Record<string, unknown> = {
      InputParameter: this.inputParameter,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAzureTokenResponse> {
    const data = await response.json();
    return msdyn_GetAzureTokenResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_GetAzureToken response message
 */
export class msdyn_GetAzureTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAzureTokenResponse) {
    super("msdyn_GetAzureToken");
  }

  static fromResponse(data: unknown): msdyn_GetAzureTokenResponse {
    return new msdyn_GetAzureTokenResponse((data as any).value);
  }
}
