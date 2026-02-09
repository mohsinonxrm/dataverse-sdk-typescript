import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TrainModel action
 */
export interface msdyn_TrainModelResponse {
  // No content returned
}

/**
 * msdyn_TrainModel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocsimltraining)
 */
export class msdyn_TrainModelAction implements Executable<msdyn_TrainModelResponse> {
  constructor(public readonly msdyn_ocsimltrainingId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_TrainModel`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainModelResponse> {
    // No return value (204 No Content)
    return {};
  }
}
