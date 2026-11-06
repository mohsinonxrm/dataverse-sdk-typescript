import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerIntegratedSearchIngestion action
 */
export interface msdyn_TriggerIntegratedSearchIngestionResponse {
  msdyn_IntegratedSearchIngestionResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchIngestion action
 *
 * Unbound action
 */
export class msdyn_TriggerIntegratedSearchIngestionAction implements Executable<msdyn_TriggerIntegratedSearchIngestionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchIngestion`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchIngestionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TriggerIntegratedSearchIngestionResponse;
  }
}
