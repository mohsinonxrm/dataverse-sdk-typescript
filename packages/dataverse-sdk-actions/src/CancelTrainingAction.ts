import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CancelTraining action
 */
export interface CancelTrainingResponse {
  response: string;
}

/**
 * Parameters of the CancelTraining action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CancelTrainingActionParameters {
  version: string;
}

/**
 * CancelTraining action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class CancelTrainingAction implements Executable<CancelTrainingResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly parameters: CancelTrainingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.CancelTraining`;

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

  async parseResponse(response: Response): Promise<CancelTrainingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CancelTrainingResponse;
  }
}
