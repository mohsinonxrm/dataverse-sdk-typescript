import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getSalesSequenceExperimentStatus action
 */
export interface msdyn_getSalesSequenceExperimentStatusResponse {
  msdyn_ExperimentStatusResponse: string;
}

/**
 * msdyn_getSalesSequenceExperimentStatus action
 *
 * Unbound action
 */
export class msdyn_getSalesSequenceExperimentStatusAction implements Executable<msdyn_getSalesSequenceExperimentStatusResponse> {
  constructor(
    public readonly msdyn_experimentKey: string,
    public readonly msdyn_experimentVersionRecordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentStatus`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<msdyn_getSalesSequenceExperimentStatusResponse> {
    const data = await response.json();
    return data as msdyn_getSalesSequenceExperimentStatusResponse;
  }
}
