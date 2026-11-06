import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ImportMappingsImportMapResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * ImportMappingsImportMap response message
 */
export class ImportMappingsImportMapResponse extends OrganizationResponse {
  constructor(public result: importmap) {
    super("ImportMappingsImportMap");
  }

  static fromResponse(data: unknown): ImportMappingsImportMapResponse {
    return new ImportMappingsImportMapResponse(responseObject<importmap>(data));
  }
}
