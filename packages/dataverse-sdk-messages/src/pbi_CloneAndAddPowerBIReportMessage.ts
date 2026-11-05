import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * pbi_CloneAndAddPowerBIReport request message
 *
 * Web API Action: pbi_CloneAndAddPowerBIReport
 */
export class pbi_CloneAndAddPowerBIReportRequest
  extends OrganizationRequest
  implements Executable<pbi_CloneAndAddPowerBIReportResponse>
{
  constructor(
    public pbi_ReportObjectId: string,
    public pbi_SolutionUniqueName: string,
    public pbi_WorkspaceObjectId: string,
    public pbi_UniqueName: string
  ) {
    super("pbi_CloneAndAddPowerBIReport");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<pbi_CloneAndAddPowerBIReportResponse> {
    const data = await response.json();
    return pbi_CloneAndAddPowerBIReportResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      pbi_ReportObjectId: this.pbi_ReportObjectId,
      pbi_SolutionUniqueName: this.pbi_SolutionUniqueName,
      pbi_WorkspaceObjectId: this.pbi_WorkspaceObjectId,
      pbi_UniqueName: this.pbi_UniqueName,
    };
  }
}

/**
 * pbi_CloneAndAddPowerBIReport response message
 */
export class pbi_CloneAndAddPowerBIReportResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("pbi_CloneAndAddPowerBIReport");
  }

  static fromResponse(data: unknown): pbi_CloneAndAddPowerBIReportResponse {
    return new pbi_CloneAndAddPowerBIReportResponse((data as any).value);
  }
}
