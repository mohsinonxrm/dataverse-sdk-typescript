import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return ShareResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Share action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ShareResult {
  "@odata.context"?: string;
  sharingresponse: string;
}

/**
 * Share response message
 *
 * `result` is the value the Share action returns (see {@link ShareResult}).
 */
export class ShareResponse extends OrganizationResponse {
  constructor(public result: ShareResult) {
    super("Share");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ShareResponse {
    return new ShareResponse(data as ShareResult);
  }
}
