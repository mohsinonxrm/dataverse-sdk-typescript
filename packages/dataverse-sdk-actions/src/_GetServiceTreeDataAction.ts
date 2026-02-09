import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _GetServiceTreeData action
 */
export interface _GetServiceTreeDataResponse {
  TreeObject: string;
}

/**
 * _GetServiceTreeData action
 *
 * Unbound action
 */
export class _GetServiceTreeDataAction implements Executable<_GetServiceTreeDataResponse> {
  constructor(
    public readonly serviceId: string,
    public readonly inputSource: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_GetServiceTreeData`;

    const body: Record<string, unknown> = {
      ServiceId: this.serviceId,
      InputSource: this.inputSource,
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

  async parseResponse(response: Response): Promise<_GetServiceTreeDataResponse> {
    const data = await response.json();
    return data as _GetServiceTreeDataResponse;
  }
}
