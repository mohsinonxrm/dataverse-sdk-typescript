import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ShareResponse as ShareResponseData } from "./types/index.js";

/**
 * Share request message
 *
 * Web API Action: Share
 */
export class ShareRequest extends OrganizationRequest implements Executable<ShareResponse> {
  constructor(
    public msdyn_pminferredtaskId: string,
    public version: string,
    public sharingrequest: string
  ) {
    super("Share");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pminferredtasks(${this.msdyn_pminferredtaskId})/Microsoft.Dynamics.CRM.Share`;

    const body: Record<string, unknown> = {
      version: this.version,
      sharingrequest: this.sharingrequest,
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

  async parseResponse(response: Response): Promise<ShareResponse> {
    const data = await response.json();
    return ShareResponse.fromResponse(data);
  }
}

/**
 * Share response message
 */
export class ShareResponse extends OrganizationResponse {
  constructor(public result: ShareResponseData) {
    super("Share");
  }

  static fromResponse(data: unknown): ShareResponse {
    return new ShareResponse(responseObject<ShareResponseData>(data));
  }
}
