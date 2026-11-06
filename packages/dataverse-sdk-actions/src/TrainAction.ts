import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the Train action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface TrainResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the Train action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface TrainActionParameters {
  version: string;
  source?: string;
}

/**
 * Train action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aiconfiguration)
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class TrainAction implements Executable<TrainResponse> {
  constructor(
    public readonly msdyn_aiconfigurationId: string,
    public readonly parameters: TrainActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.Train`;

    const body = requestBody({
      version: this.parameters.version,
      source: this.parameters.source,
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

  async parseResponse(response: Response): Promise<TrainResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as TrainResponse;
  }
}
