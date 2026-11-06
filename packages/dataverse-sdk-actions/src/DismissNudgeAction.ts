import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DismissNudge action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DismissNudgeResponse {
  "@odata.context"?: string;
  Message: string;
}

/**
 * Parameters of the DismissNudge action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DismissNudgeActionParameters {
  partitionid: string;
  ApiVersion: string;
}

/**
 * DismissNudge action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_agentnudge)
 *
 * The first argument is the id of the msdyn_agentnudge record to call it on.
 */
export class DismissNudgeAction implements Executable<DismissNudgeResponse> {
  constructor(
    public readonly msdyn_agentnudgeId: string,
    public readonly parameters: DismissNudgeActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agentnudges(${this.msdyn_agentnudgeId})/Microsoft.Dynamics.CRM.DismissNudge`;

    const body = requestBody({
      partitionid: this.parameters.partitionid,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<DismissNudgeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DismissNudgeResponse;
  }
}
