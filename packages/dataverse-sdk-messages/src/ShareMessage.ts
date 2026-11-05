import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_pminferredtaskId,
      version: this.version,
      sharingrequest: this.sharingrequest,
    };
  }
}

/**
 * Share response message
 */
export class ShareResponse extends OrganizationResponse {
  constructor(public result: ShareResponse) {
    super("Share");
  }

  static fromResponse(data: unknown): ShareResponse {
    return new ShareResponse((data as any).value);
  }
}
