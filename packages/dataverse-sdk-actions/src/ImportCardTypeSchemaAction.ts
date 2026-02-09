import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ImportCardTypeSchema action
 */
export interface ImportCardTypeSchemaResponse {
  GUID: string;
}

/**
 * ImportCardTypeSchema action
 *
 * Unbound action
 */
export class ImportCardTypeSchemaAction implements Executable<ImportCardTypeSchemaResponse> {
  constructor(public readonly importCardTypeSchema: string) {}

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
    return data as ImportCardTypeSchemaResponse;
  }
}
