import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IsSharePointEnabled request message
 *
 * Web API Action: msdyn_IsSharePointEnabled
 */
export class msdyn_IsSharePointEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsSharePointEnabledResponse>
{
  constructor() {
    super("msdyn_IsSharePointEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSharePointEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSharePointEnabledResponse> {
    const data = await response.json();
    return msdyn_IsSharePointEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_IsSharePointEnabled response message
 */
export class msdyn_IsSharePointEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsSharePointEnabledResponse) {
    super("msdyn_IsSharePointEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsSharePointEnabledResponse {
    return new msdyn_IsSharePointEnabledResponse((data as any).value);
  }
}
