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
 *
 * The first argument is the id of the msdyn_ocsimltraining record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainModelResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TrainModelResponse;
  }
}
