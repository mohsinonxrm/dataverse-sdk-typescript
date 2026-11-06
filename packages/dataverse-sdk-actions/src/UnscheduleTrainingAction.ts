import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UnscheduleTraining action
 */
export interface UnscheduleTrainingResponse {
  response: string;
}

/**
 * Parameters of the UnscheduleTraining action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnscheduleTrainingActionParameters {
  version: string;
}

/**
 * UnscheduleTraining action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class UnscheduleTrainingAction implements Executable<UnscheduleTrainingResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly parameters: UnscheduleTrainingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnscheduleTraining`;

    const body = requestBody({
      version: this.parameters.version,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UnscheduleTrainingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UnscheduleTrainingResponse;
    return (await response.json()) as UnscheduleTrainingResponse;
  }
}
