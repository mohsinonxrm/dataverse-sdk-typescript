import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportCardTypeSchemaResponse> {
    const data = await response.json();
    return ImportCardTypeSchemaResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ImportCardTypeSchema: this.importCardTypeSchema,
    };
  }
}

/**
 * ImportCardTypeSchema response message
 */
export class ImportCardTypeSchemaResponse extends OrganizationResponse {
  constructor(public result: ImportCardTypeSchemaResponse) {
    super("ImportCardTypeSchema");
  }

  static fromResponse(data: unknown): ImportCardTypeSchemaResponse {
    return new ImportCardTypeSchemaResponse((data as any).value);
  }
}
