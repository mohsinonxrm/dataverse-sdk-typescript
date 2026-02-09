import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AnalyticsSaveDataInConfigStore action
 */
export interface msdyn_AnalyticsSaveDataInConfigStoreResponse {
  // No content returned
}

/**
 * msdyn_AnalyticsSaveDataInConfigStore action
 *
 * Unbound action
 */
export class msdyn_AnalyticsSaveDataInConfigStoreAction implements Executable<msdyn_AnalyticsSaveDataInConfigStoreResponse> {
  constructor(
    public readonly key: string,
    public readonly value: string,
    public readonly configName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyticsSaveDataInConfigStore`;

    const body: Record<string, unknown> = {
      Key: this.key,
      Value: this.value,
      ConfigName: this.configName,
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

  async parseResponse(response: Response): Promise<msdyn_AnalyticsSaveDataInConfigStoreResponse> {
    // No return value (204 No Content)
    return {};
  }
}
