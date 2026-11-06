import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { ExportComponentsParams } from "./types/index.js";

/**
 * Response from ExportSolutionAsync action
 */
export interface ExportSolutionAsyncResponse {
  AsyncOperationId: string;
  ExportJobId: string;
}

/**
 * Parameters of the ExportSolutionAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionAsyncActionParameters {
  SolutionName: string;
  Managed: boolean;
  TargetVersion?: string;
  ExportAutoNumberingSettings?: boolean;
  ExportCalendarSettings?: boolean;
  ExportCustomizationSettings?: boolean;
  ExportEmailTrackingSettings?: boolean;
  ExportGeneralSettings?: boolean;
  ExportMarketingSettings?: boolean;
  ExportOutlookSynchronizationSettings?: boolean;
  ExportRelationshipRoles?: boolean;
  ExportIsvConfig?: boolean;
  ExportSales?: boolean;
  ExportExternalApplications?: boolean;
  ExportComponentsParams?: ExportComponentsParams;
}

/**
 * ExportSolutionAsync action
 *
 * Unbound action
 */
export class ExportSolutionAsyncAction implements Executable<ExportSolutionAsyncResponse> {
  constructor(public readonly parameters: ExportSolutionAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionAsync`;

    const body = requestBody({
      SolutionName: this.parameters.SolutionName,
      Managed: this.parameters.Managed,
      TargetVersion: this.parameters.TargetVersion,
      ExportAutoNumberingSettings: this.parameters.ExportAutoNumberingSettings,
      ExportCalendarSettings: this.parameters.ExportCalendarSettings,
      ExportCustomizationSettings: this.parameters.ExportCustomizationSettings,
      ExportEmailTrackingSettings: this.parameters.ExportEmailTrackingSettings,
      ExportGeneralSettings: this.parameters.ExportGeneralSettings,
      ExportMarketingSettings: this.parameters.ExportMarketingSettings,
      ExportOutlookSynchronizationSettings: this.parameters.ExportOutlookSynchronizationSettings,
      ExportRelationshipRoles: this.parameters.ExportRelationshipRoles,
      ExportIsvConfig: this.parameters.ExportIsvConfig,
      ExportSales: this.parameters.ExportSales,
      ExportExternalApplications: this.parameters.ExportExternalApplications,
      ExportComponentsParams: this.parameters.ExportComponentsParams,
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

  async parseResponse(response: Response): Promise<ExportSolutionAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ExportSolutionAsyncResponse;
    return (await response.json()) as ExportSolutionAsyncResponse;
  }
}
