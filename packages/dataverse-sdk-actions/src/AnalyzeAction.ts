import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from Analyze action
 */
export interface AnalyzeResponse {
  response: string;
}

/**
 * Parameters of the Analyze action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AnalyzeActionParameters {
  version: string;
}

/**
 * Analyze action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_pminferredtask)
 *
 * The first argument is the id of the msdyn_pminferredtask record to call it on.
 */
export class AnalyzeAction implements Executable<AnalyzeResponse> {
  constructor(
    public readonly msdyn_pminferredtaskId: string,
    public readonly parameters: AnalyzeActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_pminferredtasks(${this.msdyn_pminferredtaskId})/Microsoft.Dynamics.CRM.Analyze`;

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

  async parseResponse(response: Response): Promise<AnalyzeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AnalyzeResponse;
    return (await response.json()) as AnalyzeResponse;
  }
}
