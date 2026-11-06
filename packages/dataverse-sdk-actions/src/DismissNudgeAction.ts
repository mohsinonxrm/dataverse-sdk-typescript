import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DismissNudge action
 */
export interface DismissNudgeResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DismissNudgeResponse;
    return (await response.json()) as DismissNudgeResponse;
  }
}
