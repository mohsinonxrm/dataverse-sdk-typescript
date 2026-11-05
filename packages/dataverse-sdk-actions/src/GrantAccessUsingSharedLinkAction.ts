import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GrantAccessUsingSharedLink action
 */
export interface GrantAccessUsingSharedLinkResponse {
  // No content returned
}

/**
 * GrantAccessUsingSharedLink action
 *
 * Unbound action
 */
export class GrantAccessUsingSharedLinkAction implements Executable<GrantAccessUsingSharedLinkResponse> {
  constructor(public readonly recordUrlWithSharedLink: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccessUsingSharedLink`;

    const body: Record<string, unknown> = {
      RecordUrlWithSharedLink: this.recordUrlWithSharedLink,
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

  async parseResponse(response: Response): Promise<GrantAccessUsingSharedLinkResponse> {
    // No return value (204 No Content)
    return {};
  }
}
