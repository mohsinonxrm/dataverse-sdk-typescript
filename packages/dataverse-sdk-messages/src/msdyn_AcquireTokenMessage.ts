import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_AcquireToken response message
 */
export class msdyn_AcquireTokenResponse extends OrganizationResponse {
  constructor(public result: msdyn_AcquireTokenResponse) {
    super("msdyn_AcquireToken");
  }

  static fromResponse(data: unknown): msdyn_AcquireTokenResponse {
    return new msdyn_AcquireTokenResponse((data as any).value);
  }
}
