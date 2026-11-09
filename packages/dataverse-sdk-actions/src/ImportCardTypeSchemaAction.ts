import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ImportCardTypeSchema action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ImportCardTypeSchemaResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ImportCardTypeSchemaResponse;
  }
}
