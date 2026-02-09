import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getSalesSequenceExperimentVersion action
 */
export interface msdyn_getSalesSequenceExperimentVersionResponse {
  msdyn_experimentVersionResponse: string;
}

/**
 * msdyn_getSalesSequenceExperimentVersion action
 *
 * Unbound action
 */
export class msdyn_getSalesSequenceExperimentVersionAction implements Executable<msdyn_getSalesSequenceExperimentVersionResponse> {
  constructor(
    public readonly msdyn_experimentKey: string,
    public readonly msdyn_customerId: string,
    public readonly msdyn_versionATraffic: number,
    public readonly msdyn_experimentVersionRecordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentVersion`;

    const body: Record<string, unknown> = {
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_customerId: this.msdyn_customerId,
      msdyn_versionATraffic: this.msdyn_versionATraffic,
      msdyn_experimentVersionRecordId: this.msdyn_experimentVersionRecordId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_getSalesSequenceExperimentVersionResponse> {
    const data = await response.json();
    return data as msdyn_getSalesSequenceExperimentVersionResponse;
  }
}
