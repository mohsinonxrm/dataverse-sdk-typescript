import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the pbi_CloneAndAddPowerBIReport message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pbi_CloneAndAddPowerBIReportRequestParameters {
  pbi_ReportObjectId: string;
  pbi_SolutionUniqueName: string;
  pbi_WorkspaceObjectId: string;
  pbi_UniqueName: string;
}

/**
 * pbi_CloneAndAddPowerBIReport request message
 *
 * Web API Action: pbi_CloneAndAddPowerBIReport
 */
export class pbi_CloneAndAddPowerBIReportRequest
  extends OrganizationRequest
  implements Executable<pbi_CloneAndAddPowerBIReportResponse>
{
  declare readonly Parameters: Readonly<pbi_CloneAndAddPowerBIReportRequestParameters>;

  constructor(parameters: pbi_CloneAndAddPowerBIReportRequestParameters) {
    super("pbi_CloneAndAddPowerBIReport", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pbi_CloneAndAddPowerBIReport`;

    const body = requestBody({
      pbi_ReportObjectId: this.Parameters.pbi_ReportObjectId,
      pbi_SolutionUniqueName: this.Parameters.pbi_SolutionUniqueName,
      pbi_WorkspaceObjectId: this.Parameters.pbi_WorkspaceObjectId,
      pbi_UniqueName: this.Parameters.pbi_UniqueName,
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

  async parseResponse(response: Response): Promise<pbi_CloneAndAddPowerBIReportResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return pbi_CloneAndAddPowerBIReportResponse.fromResponse({});
    return pbi_CloneAndAddPowerBIReportResponse.fromResponse(await response.json());
  }
}

/**
 * pbi_CloneAndAddPowerBIReport response message
 */
export class pbi_CloneAndAddPowerBIReportResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("pbi_CloneAndAddPowerBIReport");
  }

  static fromResponse(data: unknown): pbi_CloneAndAddPowerBIReportResponse {
    return new pbi_CloneAndAddPowerBIReportResponse(responseObject<Record<string, unknown>>(data));
  }
}
