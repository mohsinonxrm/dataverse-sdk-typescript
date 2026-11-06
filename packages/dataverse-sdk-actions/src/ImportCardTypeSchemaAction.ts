import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ImportCardTypeSchema action
 */
export interface ImportCardTypeSchemaResponse {
  GUID: string;
}

/**
 * Parameters of the ImportCardTypeSchema action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportCardTypeSchemaActionParameters {
  ImportCardTypeSchema: string;
}

/**
 * ImportCardTypeSchema action
 *
 * Unbound action
 */
export class ImportCardTypeSchemaAction implements Executable<ImportCardTypeSchemaResponse> {
  constructor(public readonly parameters: ImportCardTypeSchemaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportCardTypeSchema`;

    const body = requestBody({
      ImportCardTypeSchema: this.parameters.ImportCardTypeSchema,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ImportCardTypeSchemaResponse;
    return (await response.json()) as ImportCardTypeSchemaResponse;
  }
}
