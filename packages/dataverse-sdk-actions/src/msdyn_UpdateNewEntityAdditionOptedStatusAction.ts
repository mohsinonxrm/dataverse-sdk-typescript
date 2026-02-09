import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateNewEntityAdditionOptedStatus action
 */
export interface msdyn_UpdateNewEntityAdditionOptedStatusResponse {
  // No content returned
}

/**
 * msdyn_UpdateNewEntityAdditionOptedStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateNewEntityAdditionOptedStatusAction implements Executable<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
  constructor(
    public readonly predictionName: string,
    public readonly predictionType: string,
    public readonly isNewEntityAdditionOpted: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNewEntityAdditionOptedStatus`;

    const body: Record<string, unknown> = {
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
      IsNewEntityAdditionOpted: this.isNewEntityAdditionOpted,
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
  ): Promise<msdyn_UpdateNewEntityAdditionOptedStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
