import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _ResourcesAddUpdateAction action
 */
export interface _ResourcesAddUpdateActionResponse {
  CyclicResources: string;
}

/**
 * _ResourcesAddUpdateAction action
 *
 * Unbound action
 */
export class _ResourcesAddUpdateActionAction implements Executable<_ResourcesAddUpdateActionResponse> {
  constructor(
    public readonly newlyAddedResources: string,
    public readonly resourceGroupId: string,
    public readonly resourceGroupsToAdd: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesAddUpdateAction`;

    const body: Record<string, unknown> = {
      NewlyAddedResources: this.newlyAddedResources,
      ResourceGroupId: this.resourceGroupId,
      ResourceGroupsToAdd: this.resourceGroupsToAdd,
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

  async parseResponse(response: Response): Promise<_ResourcesAddUpdateActionResponse> {
    const data = await response.json();
    return data as _ResourcesAddUpdateActionResponse;
  }
}
