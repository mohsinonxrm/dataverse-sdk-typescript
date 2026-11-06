import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_editSalesSequenceExperimentStatus action
 */
export interface msdyn_editSalesSequenceExperimentStatusResponse {
  msdyn_editExperimentStatusResponse: string;
}

/**
 * msdyn_editSalesSequenceExperimentStatus action
 *
 * Unbound action
 */
export class msdyn_editSalesSequenceExperimentStatusAction implements Executable<msdyn_editSalesSequenceExperimentStatusResponse> {
  constructor(
    public readonly msdyn_winnerOrDefault: string,
    public readonly msdyn_experimentKey: string,
    public readonly msdyn_expiryTime: string | undefined,
    public readonly msdyn_isDeactivated: boolean | undefined,
    public readonly msdyn_experimentVersionRecordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_editSalesSequenceExperimentStatus`;

    const body: Record<string, unknown> = {
      msdyn_winnerOrDefault: this.msdyn_winnerOrDefault,
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_expiryTime: this.msdyn_expiryTime,
      msdyn_isDeactivated: this.msdyn_isDeactivated,
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
  ): Promise<msdyn_editSalesSequenceExperimentStatusResponse> {
    const data = await response.json();
    return data as msdyn_editSalesSequenceExperimentStatusResponse;
  }
}
