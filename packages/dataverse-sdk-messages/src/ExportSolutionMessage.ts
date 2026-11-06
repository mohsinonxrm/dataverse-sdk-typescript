import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  ExportComponentsParams,
  ExportSolutionResponse as ExportSolutionResponseData,
} from "./types/index.js";

/**
 * Parameters of the ExportSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionRequestParameters {
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
 * ExportSolution request message
 *
 * Web API Action: ExportSolution
 */
export class ExportSolutionRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionResponse>
{
  declare readonly Parameters: Readonly<ExportSolutionRequestParameters>;

  constructor(parameters: ExportSolutionRequestParameters) {
    super("ExportSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolution`;

    const body = requestBody({
      SolutionName: this.Parameters.SolutionName,
      Managed: this.Parameters.Managed,
      TargetVersion: this.Parameters.TargetVersion,
      ExportAutoNumberingSettings: this.Parameters.ExportAutoNumberingSettings,
      ExportCalendarSettings: this.Parameters.ExportCalendarSettings,
      ExportCustomizationSettings: this.Parameters.ExportCustomizationSettings,
      ExportEmailTrackingSettings: this.Parameters.ExportEmailTrackingSettings,
      ExportGeneralSettings: this.Parameters.ExportGeneralSettings,
      ExportMarketingSettings: this.Parameters.ExportMarketingSettings,
      ExportOutlookSynchronizationSettings: this.Parameters.ExportOutlookSynchronizationSettings,
      ExportRelationshipRoles: this.Parameters.ExportRelationshipRoles,
      ExportIsvConfig: this.Parameters.ExportIsvConfig,
      ExportSales: this.Parameters.ExportSales,
      ExportExternalApplications: this.Parameters.ExportExternalApplications,
      ExportComponentsParams: this.Parameters.ExportComponentsParams,
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
    // 204 No Content is an empty result
    if (response.status === 204) return ExportSolutionResponse.fromResponse({});
    return ExportSolutionResponse.fromResponse(await response.json());
  }
}

/**
 * ExportSolution response message
 */
export class ExportSolutionResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionResponseData) {
    super("ExportSolution");
  }

  static fromResponse(data: unknown): ExportSolutionResponse {
    return new ExportSolutionResponse(responseObject<ExportSolutionResponseData>(data));
  }
}
