import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ExportMappingsImportMapResponse as ExportMappingsImportMapResponseData } from "./types/index.js";

/**
 * ExportMappingsImportMap request message
 *
 * Web API Action: ExportMappingsImportMap
 */
export class ExportMappingsImportMapRequest
  extends OrganizationRequest
  implements Executable<ExportMappingsImportMapResponse>
{
  constructor(
    public importmapId: string,
    public exportIds?: boolean
  ) {
    super("ExportMappingsImportMap");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/importmaps(${this.importmapId})/Microsoft.Dynamics.CRM.ExportMappingsImportMap`;

    const body: Record<string, unknown> = {
      ExportIds: this.exportIds,
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

  async parseResponse(response: Response): Promise<ExportMappingsImportMapResponse> {
    const data = await response.json();
    return ExportMappingsImportMapResponse.fromResponse(data);
  }
}

/**
 * ExportMappingsImportMap response message
 */
export class ExportMappingsImportMapResponse extends OrganizationResponse {
  constructor(public result: ExportMappingsImportMapResponseData) {
    super("ExportMappingsImportMap");
  }

  static fromResponse(data: unknown): ExportMappingsImportMapResponse {
    return new ExportMappingsImportMapResponse(
      responseObject<ExportMappingsImportMapResponseData>(data)
    );
  }
}
