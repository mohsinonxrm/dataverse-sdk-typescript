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
    const data = await response.json();
    return data as msdyn_TrainAIModelResponse;
  }
}
