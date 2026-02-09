import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_SetPresence action
 */
export interface CCaaS_SetPresenceResponse {
  // No content returned
}

/**
 * CCaaS_SetPresence action
 *
 * Unbound action
 */
export class CCaaS_SetPresenceAction implements Executable<CCaaS_SetPresenceResponse> {
  constructor(
    public readonly apiVersion: string,
    public readonly presenceId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SetPresence`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      PresenceId: this.presenceId,
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

  async parseResponse(response: Response): Promise<CCaaS_SetPresenceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
