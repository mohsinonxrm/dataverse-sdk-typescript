import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from pbi_CloneAndAddPowerBIDataset action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface pbi_CloneAndAddPowerBIDatasetResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the pbi_CloneAndAddPowerBIDataset action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pbi_CloneAndAddPowerBIDatasetActionParameters {
  pbi_DatasetObjectId: string;
  pbi_UniqueName: string;
  pbi_WorkspaceObjectId: string;
  pbi_SolutionUniqueName: string;
}

/**
 * pbi_CloneAndAddPowerBIDataset action
 *
 * Unbound action
 */
export class pbi_CloneAndAddPowerBIDatasetAction implements Executable<pbi_CloneAndAddPowerBIDatasetResponse> {
  constructor(public readonly parameters: pbi_CloneAndAddPowerBIDatasetActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pbi_CloneAndAddPowerBIDataset`;

    const body = requestBody({
      pbi_DatasetObjectId: this.parameters.pbi_DatasetObjectId,
      pbi_UniqueName: this.parameters.pbi_UniqueName,
      pbi_WorkspaceObjectId: this.parameters.pbi_WorkspaceObjectId,
      pbi_SolutionUniqueName: this.parameters.pbi_SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<pbi_CloneAndAddPowerBIDatasetResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as pbi_CloneAndAddPowerBIDatasetResponse;
    return (await response.json()) as pbi_CloneAndAddPowerBIDatasetResponse;
  }
}
