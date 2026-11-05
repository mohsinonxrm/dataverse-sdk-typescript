import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetCecCompatibilityForOmniChannel request message
 *
 * Web API Action: msdyn_GetCecCompatibilityForOmniChannel
 */
export class msdyn_GetCecCompatibilityForOmniChannelRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCecCompatibilityForOmniChannelResponse>
{
  constructor() {
    super("msdyn_GetCecCompatibilityForOmniChannel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCecCompatibilityForOmniChannel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetCecCompatibilityForOmniChannelResponse> {
    const data = await response.json();
    return msdyn_GetCecCompatibilityForOmniChannelResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetCecCompatibilityForOmniChannel response message
 */
export class msdyn_GetCecCompatibilityForOmniChannelResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCecCompatibilityForOmniChannelResponse) {
    super("msdyn_GetCecCompatibilityForOmniChannel");
  }

  static fromResponse(data: unknown): msdyn_GetCecCompatibilityForOmniChannelResponse {
    return new msdyn_GetCecCompatibilityForOmniChannelResponse((data as any).value);
  }
}
