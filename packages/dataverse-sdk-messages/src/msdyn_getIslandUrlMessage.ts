import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_getIslandUrl request message
 *
 * Web API Action: msdyn_getIslandUrl
 */
export class msdyn_getIslandUrlRequest
  extends OrganizationRequest
  implements Executable<msdyn_getIslandUrlResponse>
{
  constructor() {
    super("msdyn_getIslandUrl");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getIslandUrl`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getIslandUrlResponse> {
    const data = await response.json();
    return msdyn_getIslandUrlResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_getIslandUrl response message
 */
export class msdyn_getIslandUrlResponse extends OrganizationResponse {
  constructor(public result: msdyn_getIslandUrlResponse) {
    super("msdyn_getIslandUrl");
  }

  static fromResponse(data: unknown): msdyn_getIslandUrlResponse {
    return new msdyn_getIslandUrlResponse((data as any).value);
  }
}
