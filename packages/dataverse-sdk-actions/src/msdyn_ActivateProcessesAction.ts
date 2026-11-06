import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_ActivateProcesses action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ActivateProcessesResponse {
  "@odata.context"?: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * Parameters of the msdyn_ActivateProcesses action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateProcessesActionParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ActivateProcesses action
 *
 * Unbound action
 */
export class msdyn_ActivateProcessesAction implements Executable<msdyn_ActivateProcessesResponse> {
  constructor(public readonly parameters: msdyn_ActivateProcessesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateProcesses`;

    const body = requestBody({
      AnalysisResult: this.parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_ActivateProcessesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ActivateProcessesResponse;
  }
}
