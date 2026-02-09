import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTGetModelStatusInternal action
 */
export interface msdyn_IoTGetModelStatusInternalResponse {
  MLModelStatusJSON: string;
}

/**
 * msdyn_IoTGetModelStatusInternal action
 *
 * Unbound action
 */
export class msdyn_IoTGetModelStatusInternalAction implements Executable<msdyn_IoTGetModelStatusInternalResponse> {
  constructor(public readonly scenarioId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetModelStatusInternal`;

    const body: Record<string, unknown> = {
      ScenarioId: this.scenarioId,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetModelStatusInternalResponse> {
    const data = await response.json();
    return data as msdyn_IoTGetModelStatusInternalResponse;
  }
}
