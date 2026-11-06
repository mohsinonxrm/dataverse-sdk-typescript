import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ScheduleRetrain action
 */
export interface ScheduleRetrainResponse {
  response: string;
}

/**
 * Parameters of the ScheduleRetrain action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ScheduleRetrainActionParameters {
  recurrence: string;
  version: string;
}

/**
 * ScheduleRetrain action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aimodel)
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class ScheduleRetrainAction implements Executable<ScheduleRetrainResponse> {
  constructor(
    public readonly msdyn_aimodelId: string,
    public readonly parameters: ScheduleRetrainActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.ScheduleRetrain`;

    const body = requestBody({
      recurrence: this.parameters.recurrence,
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

  async parseResponse(response: Response): Promise<ScheduleRetrainResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ScheduleRetrainResponse;
  }
}
