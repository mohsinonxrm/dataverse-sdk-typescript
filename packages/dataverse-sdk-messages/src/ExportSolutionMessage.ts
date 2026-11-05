import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { ExportComponentsParams } from "./types/index.js";

/**
 * ExportSolution request message
 *
 * Web API Action: ExportSolution
 */
export class ExportSolutionRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionResponse>
{
  constructor(
    public solutionName: string,
    public managed: boolean,
    public targetVersion: string,
    public exportAutoNumberingSettings: boolean,
    public exportCalendarSettings: boolean,
    public exportCustomizationSettings: boolean,
    public exportEmailTrackingSettings: boolean,
    public exportGeneralSettings: boolean,
    public exportMarketingSettings: boolean,
    public exportOutlookSynchronizationSettings: boolean,
    public exportRelationshipRoles: boolean,
    public exportIsvConfig: boolean,
    public exportSales: boolean,
    public exportExternalApplications: boolean,
    public exportComponentsParams: ExportComponentsParams
  ) {
    super("ExportSolution");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ExportSolutionResponse> {
    const data = await response.json();
    return ExportSolutionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * ExportSolution response message
 */
export class ExportSolutionResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionResponse) {
    super("ExportSolution");
  }

  static fromResponse(data: unknown): ExportSolutionResponse {
    return new ExportSolutionResponse((data as any).value);
  }
}
