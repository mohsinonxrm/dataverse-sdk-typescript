import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return ExportMappingsImportMapResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExportMappingsImportMap action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportMappingsImportMapResult {
  "@odata.context"?: string;
  MappingsXml: string;
}

/**
 * ExportMappingsImportMap response message
 *
 * `result` is the value the ExportMappingsImportMap action returns (see {@link ExportMappingsImportMapResult}).
 */
export class ExportMappingsImportMapResponse extends OrganizationResponse {
  constructor(public result: ExportMappingsImportMapResult) {
    super("ExportMappingsImportMap");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExportMappingsImportMapResponse {
    return new ExportMappingsImportMapResponse(data as ExportMappingsImportMapResult);
  }
}
