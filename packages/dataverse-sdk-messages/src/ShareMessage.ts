import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ShareResponse as ShareResponseData } from "./types/index.js";

/**
 * Parameters of the Share message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ShareRequestParameters {
  version: string;
  sharingrequest: string;
}

/**
 * Share request message
 *
 * Web API Action: Share
 *
 * The first argument is the id of the msdyn_pminferredtask record to call it on.
 */
export class ShareRequest extends OrganizationRequest implements Executable<ShareResponse> {
  declare readonly Parameters: Readonly<ShareRequestParameters>;

  constructor(
    public msdyn_pminferredtaskId: string,
    parameters: ShareRequestParameters
  ) {
    super("Share", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pminferredtasks(${this.msdyn_pminferredtaskId})/Microsoft.Dynamics.CRM.Share`;

    const body = requestBody({
      version: this.Parameters.version,
      sharingrequest: this.Parameters.sharingrequest,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return ShareResponse.fromResponse({});
    return ShareResponse.fromResponse(await response.json());
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
