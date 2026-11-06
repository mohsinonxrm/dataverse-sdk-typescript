import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SiteMapRepair action
 */
export interface msdyn_SiteMapRepairResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
  HelpLink: string;
}

/**
 * msdyn_SiteMapRepair action
 *
 * Unbound action
 */
export class msdyn_SiteMapRepairAction implements Executable<msdyn_SiteMapRepairResponse> {
  constructor(public readonly analysisResult?: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapRepair`;

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

  async parseResponse(response: Response): Promise<msdyn_SiteMapRepairResponse> {
    const data = await response.json();
    return data as msdyn_SiteMapRepairResponse;
  }
}
