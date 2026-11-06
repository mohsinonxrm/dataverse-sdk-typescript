import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ScheduleTraining action
 */
export interface ScheduleTrainingResponse {
  response: string;
}

/**
 * Parameters of the ScheduleTraining action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ScheduleTrainingActionParameters {
  version: string;
}

/**
 * ScheduleTraining action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class ScheduleTrainingAction implements Executable<ScheduleTrainingResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly parameters: ScheduleTrainingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.ScheduleTraining`;

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

  async parseResponse(response: Response): Promise<ScheduleTrainingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ScheduleTrainingResponse;
    return (await response.json()) as ScheduleTrainingResponse;
  }
}
