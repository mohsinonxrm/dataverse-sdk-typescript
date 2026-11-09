import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { importmap } from "./types/index.js";

/**
 * Parameters of the ImportMappingsImportMap message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportMappingsImportMapRequestParameters {
  MappingsXml: string;
  ReplaceIds: boolean;
}

/**
 * ImportMappingsImportMap request message
 *
 * Web API Action: ImportMappingsImportMap
 */
export class ImportMappingsImportMapRequest
  extends OrganizationRequest
  implements Executable<ImportMappingsImportMapResponse>
{
  declare readonly Parameters: Readonly<ImportMappingsImportMapRequestParameters>;

  constructor(parameters: ImportMappingsImportMapRequestParameters) {
    super("ImportMappingsImportMap", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportMappingsImportMap`;

    const body = requestBody({
      MappingsXml: this.Parameters.MappingsXml,
      ReplaceIds: this.Parameters.ReplaceIds,
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

  async parseResponse(response: Response): Promise<ImportMappingsImportMapResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return ImportMappingsImportMapResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ImportMappingsImportMapResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ImportMappingsImportMap action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ImportMappingsImportMapResult =
  | (importmap & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * ImportMappingsImportMap response message
 *
 * `result` is the value the ImportMappingsImportMap action returns (see {@link ImportMappingsImportMapResult}).
 */
export class ImportMappingsImportMapResponse extends OrganizationResponse {
  constructor(public result: ImportMappingsImportMapResult) {
    super("ImportMappingsImportMap");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ImportMappingsImportMapResponse {
    return new ImportMappingsImportMapResponse((data ?? null) as ImportMappingsImportMapResult);
  }
}
