import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * pbi_CloneAndAddPowerBIDataset request message
 *
 * Web API Action: pbi_CloneAndAddPowerBIDataset
 */
export class pbi_CloneAndAddPowerBIDatasetRequest
  extends OrganizationRequest
  implements Executable<pbi_CloneAndAddPowerBIDatasetResponse>
{
  constructor(
    public pbi_DatasetObjectId: string,
    public pbi_UniqueName: string,
    public pbi_WorkspaceObjectId: string,
    public pbi_SolutionUniqueName: string
  ) {
    super("pbi_CloneAndAddPowerBIDataset");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<pbi_CloneAndAddPowerBIDatasetResponse> {
    const data = await response.json();
    return pbi_CloneAndAddPowerBIDatasetResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      pbi_DatasetObjectId: this.pbi_DatasetObjectId,
      pbi_UniqueName: this.pbi_UniqueName,
      pbi_WorkspaceObjectId: this.pbi_WorkspaceObjectId,
      pbi_SolutionUniqueName: this.pbi_SolutionUniqueName,
    };
  }
}

/**
 * pbi_CloneAndAddPowerBIDataset response message
 */
export class pbi_CloneAndAddPowerBIDatasetResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("pbi_CloneAndAddPowerBIDataset");
  }

  static fromResponse(data: unknown): pbi_CloneAndAddPowerBIDatasetResponse {
    return new pbi_CloneAndAddPowerBIDatasetResponse((data as any).value);
  }
}
