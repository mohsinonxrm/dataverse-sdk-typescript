import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteInstantPlugin action
 */
export interface DeleteInstantPluginResponse {
  // No content returned
}

/**
 * DeleteInstantPlugin action
 *
 * Unbound action
 */
export class DeleteInstantPluginAction implements Executable<DeleteInstantPluginResponse> {
  constructor(public readonly fxExpressionUniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteInstantPlugin`;

    const body: Record<string, unknown> = {
      FxExpressionUniqueName: this.fxExpressionUniqueName,
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

  async parseResponse(response: Response): Promise<DeleteInstantPluginResponse> {
    // No return value (204 No Content)
    return {};
  }
}
