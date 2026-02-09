import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _InvokeHideReserveEntities action
 */
export interface _InvokeHideReserveEntitiesResponse {
  output: string;
}

/**
 * _InvokeHideReserveEntities action
 *
 * Unbound action
 */
export class _InvokeHideReserveEntitiesAction implements Executable<_InvokeHideReserveEntitiesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_InvokeHideReserveEntities`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<_InvokeHideReserveEntitiesResponse> {
    const data = await response.json();
    return data as _InvokeHideReserveEntitiesResponse;
  }
}
