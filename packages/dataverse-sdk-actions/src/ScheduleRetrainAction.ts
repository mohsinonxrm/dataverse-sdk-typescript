import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ScheduleRetrain action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ScheduleRetrainResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.ScheduleRetrain`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ScheduleRetrainResponse;
  }
}
