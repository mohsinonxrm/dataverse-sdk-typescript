import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * pbi_CloneAndAddPowerBIDataset action
 *
 * Unbound action
 */
export class pbi_CloneAndAddPowerBIDatasetAction implements Executable<pbi_CloneAndAddPowerBIDatasetResponse> {
  constructor(
    public readonly pbi_DatasetObjectId: string,
    public readonly pbi_UniqueName: string,
    public readonly pbi_WorkspaceObjectId: string,
    public readonly pbi_SolutionUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pbi_CloneAndAddPowerBIDataset`;

    const body: Record<string, unknown> = {
      pbi_DatasetObjectId: this.pbi_DatasetObjectId,
      pbi_UniqueName: this.pbi_UniqueName,
      pbi_WorkspaceObjectId: this.pbi_WorkspaceObjectId,
      pbi_SolutionUniqueName: this.pbi_SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<pbi_CloneAndAddPowerBIDatasetResponse> {
    const data = await response.json();
    return data as pbi_CloneAndAddPowerBIDatasetResponse;
  }
}
