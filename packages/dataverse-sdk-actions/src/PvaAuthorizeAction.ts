import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaAuthorize action
 */
export interface PvaAuthorizeResponse {
  // No content returned
}

/**
 * PvaAuthorize action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 */
export class PvaAuthorizeAction implements Executable<PvaAuthorizeResponse> {
  constructor(
    public readonly botId: string,
    public readonly users: Record<string, unknown>[],
    public readonly sharingRoleType: number,
    public readonly shareOrUnshare: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaAuthorize`;

    const body: Record<string, unknown> = {
      Users: this.users,
      SharingRoleType: this.sharingRoleType,
      ShareOrUnshare: this.shareOrUnshare,
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

  async parseResponse(response: Response): Promise<PvaAuthorizeResponse> {
    // No return value (204 No Content)
    return {};
  }
}
