import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteAutomatedPlugin action
 */
export interface DeleteAutomatedPluginResponse {
  // No content returned
}

/**
 * DeleteAutomatedPlugin action
 *
 * Unbound action
 */
export class DeleteAutomatedPluginAction implements Executable<DeleteAutomatedPluginResponse> {
  constructor(public readonly pluginid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAutomatedPlugin`;

    const body: Record<string, unknown> = {
      pluginid: this.pluginid,
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

  async parseResponse(response: Response): Promise<DeleteAutomatedPluginResponse> {
    // No return value (204 No Content)
    return {};
  }
}
