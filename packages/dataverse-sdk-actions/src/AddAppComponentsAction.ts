import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddAppComponents action
 */
export interface AddAppComponentsResponse {
  // No content returned
}

/**
 * AddAppComponents action
 *
 * Unbound action
 */
export class AddAppComponentsAction implements Executable<AddAppComponentsResponse> {
  constructor(
    public readonly appId: string,
    public readonly components: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddAppComponents`;

    const body: Record<string, unknown> = {
      AppId: this.appId,
      Components: this.components,
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

  async parseResponse(response: Response): Promise<AddAppComponentsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
