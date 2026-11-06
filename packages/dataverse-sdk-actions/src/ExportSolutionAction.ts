import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { ExportComponentsParams } from "./types/index.js";

/**
 * Response from ExportSolution action
 */
export interface ExportSolutionResponse {
  ExportSolutionFile: string;
}

/**
 * Parameters of the ExportSolution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionActionParameters {
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
 * ExportSolution action
 *
 * Unbound action
 */
export class ExportSolutionAction implements Executable<ExportSolutionResponse> {
  constructor(public readonly parameters: ExportSolutionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolution`;

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

  async parseResponse(response: Response): Promise<ExportSolutionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ExportSolutionResponse;
  }
}
