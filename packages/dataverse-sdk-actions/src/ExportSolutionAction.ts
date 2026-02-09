import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { ExportComponentsParams } from "./types/index.js";

/**
 * Response from ExportSolution action
 */
export interface ExportSolutionResponse {
  ExportSolutionFile: string;
}

/**
 * ExportSolution action
 *
 * Unbound action
 */
export class ExportSolutionAction implements Executable<ExportSolutionResponse> {
  constructor(
    public readonly solutionName: string,
    public readonly managed: boolean,
    public readonly targetVersion: string,
    public readonly exportAutoNumberingSettings: boolean,
    public readonly exportCalendarSettings: boolean,
    public readonly exportCustomizationSettings: boolean,
    public readonly exportEmailTrackingSettings: boolean,
    public readonly exportGeneralSettings: boolean,
    public readonly exportMarketingSettings: boolean,
    public readonly exportOutlookSynchronizationSettings: boolean,
    public readonly exportRelationshipRoles: boolean,
    public readonly exportIsvConfig: boolean,
    public readonly exportSales: boolean,
    public readonly exportExternalApplications: boolean,
    public readonly exportComponentsParams: ExportComponentsParams
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolution`;

    const body: Record<string, unknown> = {
      SolutionName: this.solutionName,
      Managed: this.managed,
      TargetVersion: this.targetVersion,
      ExportAutoNumberingSettings: this.exportAutoNumberingSettings,
      ExportCalendarSettings: this.exportCalendarSettings,
      ExportCustomizationSettings: this.exportCustomizationSettings,
      ExportEmailTrackingSettings: this.exportEmailTrackingSettings,
      ExportGeneralSettings: this.exportGeneralSettings,
      ExportMarketingSettings: this.exportMarketingSettings,
      ExportOutlookSynchronizationSettings: this.exportOutlookSynchronizationSettings,
      ExportRelationshipRoles: this.exportRelationshipRoles,
      ExportIsvConfig: this.exportIsvConfig,
      ExportSales: this.exportSales,
      ExportExternalApplications: this.exportExternalApplications,
      ExportComponentsParams: this.exportComponentsParams,
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

  async parseResponse(response: Response): Promise<ExportSolutionResponse> {
    const data = await response.json();
    return data as ExportSolutionResponse;
  }
}
