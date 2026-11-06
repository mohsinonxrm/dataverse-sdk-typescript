import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TrainAIModel action
 */
export interface msdyn_TrainAIModelResponse {
  Response: string;
}

/**
 * msdyn_TrainAIModel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocskillidentmlmodel)
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
 */
export class msdyn_TrainAIModelAction implements Executable<msdyn_TrainAIModelResponse> {
  constructor(public readonly msdyn_ocskillidentmlmodelId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_TrainAIModel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainAIModelResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TrainAIModelResponse;
    return (await response.json()) as msdyn_TrainAIModelResponse;
  }
}
