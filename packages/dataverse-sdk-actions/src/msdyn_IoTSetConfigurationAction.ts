import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTSetConfiguration action
 */
export interface msdyn_IoTSetConfigurationResponse {
  // No content returned
}

/**
 * msdyn_IoTSetConfiguration action
 *
 * Unbound action
 */
export class msdyn_IoTSetConfigurationAction implements Executable<msdyn_IoTSetConfigurationResponse> {
  constructor(
    public readonly key: string,
    public readonly value: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSetConfiguration`;

    const body: Record<string, unknown> = {
      Key: this.key,
      Value: this.value,
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

  async parseResponse(response: Response): Promise<msdyn_IoTSetConfigurationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
