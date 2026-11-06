import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from pbi_CloneAndAddPowerBIReport action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface pbi_CloneAndAddPowerBIReportResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the pbi_CloneAndAddPowerBIReport action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pbi_CloneAndAddPowerBIReportActionParameters {
  pbi_ReportObjectId: string;
  pbi_SolutionUniqueName: string;
  pbi_WorkspaceObjectId: string;
  pbi_UniqueName: string;
}

/**
 * pbi_CloneAndAddPowerBIReport action
 *
 * Unbound action
 */
export class pbi_CloneAndAddPowerBIReportAction implements Executable<pbi_CloneAndAddPowerBIReportResponse> {
  constructor(public readonly parameters: pbi_CloneAndAddPowerBIReportActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pbi_CloneAndAddPowerBIReport`;

    const body = requestBody({
      pbi_ReportObjectId: this.parameters.pbi_ReportObjectId,
      pbi_SolutionUniqueName: this.parameters.pbi_SolutionUniqueName,
      pbi_WorkspaceObjectId: this.parameters.pbi_WorkspaceObjectId,
      pbi_UniqueName: this.parameters.pbi_UniqueName,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as pbi_CloneAndAddPowerBIReportResponse;
  }
}
