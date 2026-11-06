import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the _InvokeHideReserveEntities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _InvokeHideReserveEntitiesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _InvokeHideReserveEntitiesResponse;
  }
}
