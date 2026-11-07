import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_TriggerIntegratedSearchIngestion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerIntegratedSearchIngestionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TriggerIntegratedSearchIngestionResponse;
  }
}
