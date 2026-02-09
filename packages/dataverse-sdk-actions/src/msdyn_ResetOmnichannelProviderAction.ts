import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ResetOmnichannelProvider action
 */
export interface msdyn_ResetOmnichannelProviderResponse {
  // No content returned
}

/**
 * msdyn_ResetOmnichannelProvider action
 *
 * Unbound action
 */
export class msdyn_ResetOmnichannelProviderAction implements Executable<msdyn_ResetOmnichannelProviderResponse> {
  constructor(public readonly orgBaseUrl: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetOmnichannelProvider`;

    const body: Record<string, unknown> = {
      OrgBaseUrl: this.orgBaseUrl,
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

  async parseResponse(response: Response): Promise<msdyn_ResetOmnichannelProviderResponse> {
    // No return value (204 No Content)
    return {};
  }
}
