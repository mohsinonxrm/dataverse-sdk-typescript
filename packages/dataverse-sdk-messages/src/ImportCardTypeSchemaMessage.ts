import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ImportCardTypeSchemaResponse as ImportCardTypeSchemaResponseData } from "./types/index.js";

/**
 * Parameters of the ImportCardTypeSchema message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportCardTypeSchemaRequestParameters {
  ImportCardTypeSchema: string;
}

/**
 * ImportCardTypeSchema request message
 *
 * Web API Action: ImportCardTypeSchema
 */
export class ImportCardTypeSchemaRequest
  extends OrganizationRequest
  implements Executable<ImportCardTypeSchemaResponse>
{
  declare readonly Parameters: Readonly<ImportCardTypeSchemaRequestParameters>;

  constructor(parameters: ImportCardTypeSchemaRequestParameters) {
    super("ImportCardTypeSchema", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportCardTypeSchema`;

    const body = requestBody({
      ImportCardTypeSchema: this.Parameters.ImportCardTypeSchema,
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

  async parseResponse(response: Response): Promise<ImportCardTypeSchemaResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ImportCardTypeSchemaResponse.fromResponse(text ? JSON.parse(text) : {});
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
