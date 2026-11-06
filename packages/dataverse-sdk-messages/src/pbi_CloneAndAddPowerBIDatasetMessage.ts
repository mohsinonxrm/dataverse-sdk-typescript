import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the pbi_CloneAndAddPowerBIDataset message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pbi_CloneAndAddPowerBIDatasetRequestParameters {
  pbi_DatasetObjectId: string;
  pbi_UniqueName: string;
  pbi_WorkspaceObjectId: string;
  pbi_SolutionUniqueName: string;
}

/**
 * pbi_CloneAndAddPowerBIDataset request message
 *
 * Web API Action: pbi_CloneAndAddPowerBIDataset
 */
export class pbi_CloneAndAddPowerBIDatasetRequest
  extends OrganizationRequest
  implements Executable<pbi_CloneAndAddPowerBIDatasetResponse>
{
  declare readonly Parameters: Readonly<pbi_CloneAndAddPowerBIDatasetRequestParameters>;

  constructor(parameters: pbi_CloneAndAddPowerBIDatasetRequestParameters) {
    super("pbi_CloneAndAddPowerBIDataset", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pbi_CloneAndAddPowerBIDataset`;

    const body = requestBody({
      pbi_DatasetObjectId: this.Parameters.pbi_DatasetObjectId,
      pbi_UniqueName: this.Parameters.pbi_UniqueName,
      pbi_WorkspaceObjectId: this.Parameters.pbi_WorkspaceObjectId,
      pbi_SolutionUniqueName: this.Parameters.pbi_SolutionUniqueName,
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
    if (response.status === 204) return pbi_CloneAndAddPowerBIDatasetResponse.fromResponse({});
    return pbi_CloneAndAddPowerBIDatasetResponse.fromResponse(await response.json());
  }
}

/**
 * pbi_CloneAndAddPowerBIDataset response message
 */
export class pbi_CloneAndAddPowerBIDatasetResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("pbi_CloneAndAddPowerBIDataset");
  }

  static fromResponse(data: unknown): pbi_CloneAndAddPowerBIDatasetResponse {
    return new pbi_CloneAndAddPowerBIDatasetResponse(responseObject<Record<string, unknown>>(data));
  }
}
