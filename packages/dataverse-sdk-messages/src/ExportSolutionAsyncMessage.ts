import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type {
  ExportComponentsParams,
  ExportSolutionAsyncResponse as ExportSolutionAsyncResponseData,
} from "./types/index.js";

/**
 * Parameters of the ExportSolutionAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportSolutionAsyncRequestParameters {
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
 * ExportSolutionAsync request message
 *
 * Web API Action: ExportSolutionAsync
 */
export class ExportSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<ExportSolutionAsyncResponse>
{
  declare readonly Parameters: Readonly<ExportSolutionAsyncRequestParameters>;

  constructor(parameters: ExportSolutionAsyncRequestParameters) {
    super("ExportSolutionAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportSolutionAsync`;

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

  async parseResponse(response: Response): Promise<ExportSolutionAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ExportSolutionAsyncResponse.fromResponse({});
    return ExportSolutionAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * ExportSolutionAsync response message
 */
export class ExportSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: ExportSolutionAsyncResponseData) {
    super("ExportSolutionAsync");
  }

  static fromResponse(data: unknown): ExportSolutionAsyncResponse {
    return new ExportSolutionAsyncResponse(responseObject<ExportSolutionAsyncResponseData>(data));
  }
}
