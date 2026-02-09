import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IsSSSEnabled request message
 *
 * Web API Action: msdyn_IsSSSEnabled
 */
export class msdyn_IsSSSEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsSSSEnabledResponse>
{
  constructor() {
    super("msdyn_IsSSSEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSSSEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSSSEnabledResponse> {
    const data = await response.json();
    return msdyn_IsSSSEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_IsSSSEnabled response message
 */
export class msdyn_IsSSSEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsSSSEnabledResponse) {
    super("msdyn_IsSSSEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsSSSEnabledResponse {
    return new msdyn_IsSSSEnabledResponse((data as any).value);
  }
}
