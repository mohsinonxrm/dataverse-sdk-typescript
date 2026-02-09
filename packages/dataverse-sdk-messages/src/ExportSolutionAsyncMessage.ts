import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { ExportComponentsParams } from "./types/index.js";

/**
 * ExportSolutionAsync request message
 *
 * Web API Action: ExportSolutionAsync
 */
export class ExportSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionAsyncResponse>
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
    super("ExportSolutionAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionAsync`;

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

  async parseResponse(response: Response): Promise<ExportSolutionAsyncResponse> {
    const data = await response.json();
    return ExportSolutionAsyncResponse.fromResponse(data);
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
 * ExportSolutionAsync response message
 */
export class ExportSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionAsyncResponse) {
    super("ExportSolutionAsync");
  }

  static fromResponse(data: unknown): ExportSolutionAsyncResponse {
    return new ExportSolutionAsyncResponse((data as any).value);
  }
}
