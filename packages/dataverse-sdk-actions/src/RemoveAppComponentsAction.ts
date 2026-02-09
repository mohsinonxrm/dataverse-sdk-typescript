import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RemoveAppComponents action
 */
export interface RemoveAppComponentsResponse {
  // No content returned
}

/**
 * RemoveAppComponents action
 *
 * Unbound action
 */
export class RemoveAppComponentsAction implements Executable<RemoveAppComponentsResponse> {
  constructor(
    public readonly appId: string,
    public readonly components: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveAppComponents`;

    const body: Record<string, unknown> = {
      AppId: this.appId,
      Components: this.components,
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

  async parseResponse(response: Response): Promise<RemoveAppComponentsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
