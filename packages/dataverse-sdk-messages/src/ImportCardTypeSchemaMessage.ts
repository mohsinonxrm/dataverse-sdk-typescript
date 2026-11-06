import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ImportCardTypeSchemaResponse as ImportCardTypeSchemaResponseData } from "./types/index.js";

/**
 * ImportCardTypeSchema request message
 *
 * Web API Action: ImportCardTypeSchema
 */
export class ImportCardTypeSchemaRequest
  extends OrganizationRequest
  implements Executable<ImportCardTypeSchemaResponse>
{
  constructor(public importCardTypeSchema: string) {
    super("ImportCardTypeSchema");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportCardTypeSchema`;

    const body: Record<string, unknown> = {
      ImportCardTypeSchema: this.importCardTypeSchema,
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

  async parseResponse(response: Response): Promise<ImportCardTypeSchemaResponse> {
    const data = await response.json();
    return ImportCardTypeSchemaResponse.fromResponse(data);
  }
}

/**
 * ImportCardTypeSchema response message
 */
export class ImportCardTypeSchemaResponse extends OrganizationResponse {
  constructor(public result: ImportCardTypeSchemaResponseData) {
    super("ImportCardTypeSchema");
  }

  static fromResponse(data: unknown): ImportCardTypeSchemaResponse {
    return new ImportCardTypeSchemaResponse(responseObject<ImportCardTypeSchemaResponseData>(data));
  }
}
