import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _ResourcesRemoveUpdateAction action
 */
export interface _ResourcesRemoveUpdateActionResponse {
  // No content returned
}

/**
 * _ResourcesRemoveUpdateAction action
 *
 * Unbound action
 */
export class _ResourcesRemoveUpdateActionAction implements Executable<_ResourcesRemoveUpdateActionResponse> {
  constructor(
    public readonly resourcesToBeRemoved?: string,
    public readonly resourceGroupId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesRemoveUpdateAction`;

    const body: Record<string, unknown> = {
      ResourcesToBeRemoved: this.resourcesToBeRemoved,
      ResourceGroupId: this.resourceGroupId,
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

  async parseResponse(response: Response): Promise<_ResourcesRemoveUpdateActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
