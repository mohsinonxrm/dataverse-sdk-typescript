import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_ModelAppRepair action
 */
export interface msdyn_ModelAppRepairResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
  HelpLink: string;
}

/**
 * msdyn_ModelAppRepair action
 *
 * Unbound action
 */
export class msdyn_ModelAppRepairAction implements Executable<msdyn_ModelAppRepairResponse> {
  constructor(public readonly analysisResult: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppRepair`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ModelAppRepairResponse> {
    const data = await response.json();
    return data as msdyn_ModelAppRepairResponse;
  }
}
