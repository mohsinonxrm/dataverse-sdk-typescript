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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<_InvokeHideReserveEntitiesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as _InvokeHideReserveEntitiesResponse;
  }
}
