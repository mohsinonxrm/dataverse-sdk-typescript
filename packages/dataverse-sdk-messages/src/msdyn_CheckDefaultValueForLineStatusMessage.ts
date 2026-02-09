import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckDefaultValueForLineStatus request message
 *
 * Web API Action: msdyn_CheckDefaultValueForLineStatus
 */
export class msdyn_CheckDefaultValueForLineStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckDefaultValueForLineStatusResponse>
{
  constructor() {
    super("msdyn_CheckDefaultValueForLineStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckDefaultValueForLineStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckDefaultValueForLineStatusResponse> {
    const data = await response.json();
    return msdyn_CheckDefaultValueForLineStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckDefaultValueForLineStatus response message
 */
export class msdyn_CheckDefaultValueForLineStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckDefaultValueForLineStatusResponse) {
    super("msdyn_CheckDefaultValueForLineStatus");
  }

  static fromResponse(data: unknown): msdyn_CheckDefaultValueForLineStatusResponse {
    return new msdyn_CheckDefaultValueForLineStatusResponse((data as any).value);
  }
}
