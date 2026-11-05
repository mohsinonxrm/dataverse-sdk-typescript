import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from Share action
 */
export interface ShareResponse {
  sharingresponse: string;
}

/**
 * Share action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_pminferredtask)
 */
export class ShareAction implements Executable<ShareResponse> {
  constructor(
    public readonly msdyn_pminferredtaskId: string,
    public readonly version: string,
    public readonly sharingrequest: string
  ) {}

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
    return data as ShareResponse;
  }
}
