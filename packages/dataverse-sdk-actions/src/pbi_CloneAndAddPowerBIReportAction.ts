import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from pbi_CloneAndAddPowerBIReport action
 */
export interface pbi_CloneAndAddPowerBIReportResponse {
  value: EntityReference;
}

/**
 * pbi_CloneAndAddPowerBIReport action
 *
 * Unbound action
 */
export class pbi_CloneAndAddPowerBIReportAction implements Executable<pbi_CloneAndAddPowerBIReportResponse> {
  constructor(
    public readonly pbi_ReportObjectId: string,
    public readonly pbi_SolutionUniqueName: string,
    public readonly pbi_WorkspaceObjectId: string,
    public readonly pbi_UniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pbi_CloneAndAddPowerBIReport`;

    const body: Record<string, unknown> = {
      pbi_ReportObjectId: this.pbi_ReportObjectId,
      pbi_SolutionUniqueName: this.pbi_SolutionUniqueName,
      pbi_WorkspaceObjectId: this.pbi_WorkspaceObjectId,
      pbi_UniqueName: this.pbi_UniqueName,
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

  async parseResponse(response: Response): Promise<pbi_CloneAndAddPowerBIReportResponse> {
    const data = await response.json();
    return data as pbi_CloneAndAddPowerBIReportResponse;
  }
}
