import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WKWGDPRDeleteStatus request message
 *
 * Web API Action: msdyn_WKWGDPRDeleteStatus
 */
export class msdyn_WKWGDPRDeleteStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_WKWGDPRDeleteStatusResponse>
{
  constructor(public userIds: string[]) {
    super("msdyn_WKWGDPRDeleteStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWGDPRDeleteStatus`;

    const body: Record<string, unknown> = {
      UserIds: this.userIds,
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

  async parseResponse(response: Response): Promise<msdyn_WKWGDPRDeleteStatusResponse> {
    const data = await response.json();
    return msdyn_WKWGDPRDeleteStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      UserIds: this.userIds,
    };
  }
}

/**
 * msdyn_WKWGDPRDeleteStatus response message
 */
export class msdyn_WKWGDPRDeleteStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_WKWGDPRDeleteStatusResponse) {
    super("msdyn_WKWGDPRDeleteStatus");
  }

  static fromResponse(data: unknown): msdyn_WKWGDPRDeleteStatusResponse {
    return new msdyn_WKWGDPRDeleteStatusResponse((data as any).value);
  }
}
