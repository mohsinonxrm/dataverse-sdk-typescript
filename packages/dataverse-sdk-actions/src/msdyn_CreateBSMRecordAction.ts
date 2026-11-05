import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateBSMRecord action
 */
export interface msdyn_CreateBSMRecordResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * msdyn_CreateBSMRecord action
 *
 * Unbound action
 */
export class msdyn_CreateBSMRecordAction implements Executable<msdyn_CreateBSMRecordResponse> {
  constructor(public readonly analysisResult: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateBSMRecord`;

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

  async parseResponse(response: Response): Promise<msdyn_CreateBSMRecordResponse> {
    const data = await response.json();
    return data as msdyn_CreateBSMRecordResponse;
  }
}
