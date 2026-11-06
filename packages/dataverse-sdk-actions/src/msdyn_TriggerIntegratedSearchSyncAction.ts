import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_TriggerIntegratedSearchSync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerIntegratedSearchSyncResponse {
  "@odata.context"?: string;
  msdyn_IntegratedSearchSyncResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchSync action
 *
 * Unbound action
 */
export class msdyn_TriggerIntegratedSearchSyncAction implements Executable<msdyn_TriggerIntegratedSearchSyncResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchSync`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchSyncResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TriggerIntegratedSearchSyncResponse;
  }
}
