import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CancelTraining action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CancelTrainingResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.CancelTraining`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CancelTrainingResponse;
  }
}
