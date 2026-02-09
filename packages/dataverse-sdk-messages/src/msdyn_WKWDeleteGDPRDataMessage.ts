import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WKWDeleteGDPRData request message
 *
 * Web API Action: msdyn_WKWDeleteGDPRData
 */
export class msdyn_WKWDeleteGDPRDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_WKWDeleteGDPRDataResponse>
{
  constructor(public userIds: string[]) {
    super("msdyn_WKWDeleteGDPRData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWDeleteGDPRData`;

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

  async parseResponse(response: Response): Promise<msdyn_WKWDeleteGDPRDataResponse> {
    // No return value (204 No Content)
    return new msdyn_WKWDeleteGDPRDataResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      UserIds: this.userIds,
    };
  }
}

/**
 * msdyn_WKWDeleteGDPRData response message
 */
export class msdyn_WKWDeleteGDPRDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_WKWDeleteGDPRData");
  }

  static fromResponse(_data: unknown): msdyn_WKWDeleteGDPRDataResponse {
    return new msdyn_WKWDeleteGDPRDataResponse();
  }
}
