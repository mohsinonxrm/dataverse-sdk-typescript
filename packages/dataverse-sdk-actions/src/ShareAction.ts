import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the Share action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ShareResponse {
  "@odata.context"?: string;
  sharingresponse: string;
}

/**
 * Parameters of the Share action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ShareActionParameters {
  version: string;
  sharingrequest: string;
}

/**
 * Share action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_pminferredtask)
 *
 * The first argument is the id of the msdyn_pminferredtask record to call it on.
 */
export class ShareAction implements Executable<ShareResponse> {
  constructor(
    public readonly msdyn_pminferredtaskId: string,
    public readonly parameters: ShareActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pminferredtasks(${this.msdyn_pminferredtaskId})/Microsoft.Dynamics.CRM.Share`;

    const body = requestBody({
      version: this.parameters.version,
      sharingrequest: this.parameters.sharingrequest,
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
    return (await response.json()) as ShareResponse;
  }
}
