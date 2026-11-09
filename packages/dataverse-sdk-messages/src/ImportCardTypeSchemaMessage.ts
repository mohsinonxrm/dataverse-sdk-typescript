import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return ImportCardTypeSchemaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ImportCardTypeSchema action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ImportCardTypeSchemaResult {
  "@odata.context"?: string;
  GUID: string;
}

/**
 * ImportCardTypeSchema response message
 *
 * `result` is the value the ImportCardTypeSchema action returns (see {@link ImportCardTypeSchemaResult}).
 */
export class ImportCardTypeSchemaResponse extends OrganizationResponse {
  constructor(public result: ImportCardTypeSchemaResult) {
    super("ImportCardTypeSchema");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ImportCardTypeSchemaResponse {
    return new ImportCardTypeSchemaResponse(data as ImportCardTypeSchemaResult);
  }
}
