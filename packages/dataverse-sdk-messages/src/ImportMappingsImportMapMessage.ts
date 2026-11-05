import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { importmap } from "./types/index.js";

/**
 * ImportMappingsImportMap request message
 *
 * Web API Action: ImportMappingsImportMap
 */
export class ImportMappingsImportMapRequest
  extends OrganizationRequest
  implements Executable<ImportMappingsImportMapResponse>
{
  constructor(
    public mappingsXml: string,
    public replaceIds: boolean
  ) {
    super("ImportMappingsImportMap");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportMappingsImportMap`;

    const body: Record<string, unknown> = {
      MappingsXml: this.mappingsXml,
      ReplaceIds: this.replaceIds,
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

  async parseResponse(response: Response): Promise<ImportMappingsImportMapResponse> {
    const data = await response.json();
    return ImportMappingsImportMapResponse.fromResponse(data);
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
