import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getSalesSequenceExperimentSettings action
 */
export interface msdyn_getSalesSequenceExperimentSettingsResponse {
  msdyn_experimentSettingsResponse: string;
}

/**
 * msdyn_getSalesSequenceExperimentSettings action
 *
 * Unbound action
 */
export class msdyn_getSalesSequenceExperimentSettingsAction implements Executable<msdyn_getSalesSequenceExperimentSettingsResponse> {
  constructor(
    public readonly msdyn_experimentRecordId: string,
    public readonly msdyn_experimentKey: string,
    public readonly msdyn_experimentVersionRecordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentSettings`;

    const body: Record<string, unknown> = {
      msdyn_experimentRecordId: this.msdyn_experimentRecordId,
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_experimentVersionRecordId: this.msdyn_experimentVersionRecordId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_getSalesSequenceExperimentSettingsResponse> {
    const data = await response.json();
    return data as msdyn_getSalesSequenceExperimentSettingsResponse;
  }
}
