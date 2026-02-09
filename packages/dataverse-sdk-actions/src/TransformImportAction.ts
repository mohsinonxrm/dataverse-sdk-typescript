import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from TransformImport action
 */
export interface TransformImportResponse {
  value: asyncoperation;
}

/**
 * TransformImport action
 *
 * Unbound action
 */
export class TransformImportAction implements Executable<TransformImportResponse> {
  constructor(public readonly importId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/TransformImport`;

    const body: Record<string, unknown> = {
      ImportId: this.importId,
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

  async parseResponse(response: Response): Promise<TransformImportResponse> {
    const data = await response.json();
    return data as TransformImportResponse;
  }
}
