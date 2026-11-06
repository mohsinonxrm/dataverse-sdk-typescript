import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerIntegratedSearchSync action
 */
export interface msdyn_TriggerIntegratedSearchSyncResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TriggerIntegratedSearchSyncResponse;
    return (await response.json()) as msdyn_TriggerIntegratedSearchSyncResponse;
  }
}
