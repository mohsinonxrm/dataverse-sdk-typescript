import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ExportMappingsImportMapResponse as ExportMappingsImportMapResponseData } from "./types/index.js";

/**
 * Parameters of the ExportMappingsImportMap message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportMappingsImportMapRequestParameters {
  ExportIds?: boolean;
}

/**
 * ExportMappingsImportMap request message
 *
 * Web API Action: ExportMappingsImportMap
 *
 * The first argument is the id of the importmap record to call it on.
 */
export class ExportMappingsImportMapRequest
  extends OrganizationRequest
  implements Executable<ExportMappingsImportMapResponse>
{
  declare readonly Parameters: Readonly<ExportMappingsImportMapRequestParameters>;

  constructor(
    public importmapId: string,
    parameters: ExportMappingsImportMapRequestParameters = {}
  ) {
    super("ExportMappingsImportMap", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/importmaps(${this.importmapId})/Microsoft.Dynamics.CRM.ExportMappingsImportMap`;

    const body = requestBody({
      ExportIds: this.Parameters.ExportIds,
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

  async parseResponse(response: Response): Promise<ExportMappingsImportMapResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ExportMappingsImportMapResponse.fromResponse(text ? JSON.parse(text) : {});
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
