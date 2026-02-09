import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_ActivateProcesses action
 */
export interface msdyn_ActivateProcessesResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * msdyn_ActivateProcesses action
 *
 * Unbound action
 */
export class msdyn_ActivateProcessesAction implements Executable<msdyn_ActivateProcessesResponse> {
  constructor(public readonly analysisResult: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateProcesses`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ActivateProcessesResponse> {
    const data = await response.json();
    return data as msdyn_ActivateProcessesResponse;
  }
}
