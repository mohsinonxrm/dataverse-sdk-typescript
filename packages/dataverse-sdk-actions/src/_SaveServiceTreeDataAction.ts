import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _SaveServiceTreeData action
 */
export interface _SaveServiceTreeDataResponse {
  UpdatedRootNode: string;
  Error: string;
}

/**
 * _SaveServiceTreeData action
 *
 * Unbound action
 */
export class _SaveServiceTreeDataAction implements Executable<_SaveServiceTreeDataResponse> {
  constructor(
    public readonly rootNodeId: string,
    public readonly resourceRuleList: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SaveServiceTreeData`;

    const body: Record<string, unknown> = {
      RootNodeId: this.rootNodeId,
      ResourceRuleList: this.resourceRuleList,
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

  async parseResponse(response: Response): Promise<_SaveServiceTreeDataResponse> {
    const data = await response.json();
    return data as _SaveServiceTreeDataResponse;
  }
}
