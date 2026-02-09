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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchSyncResponse> {
    const data = await response.json();
    return data as msdyn_TriggerIntegratedSearchSyncResponse;
  }
}
