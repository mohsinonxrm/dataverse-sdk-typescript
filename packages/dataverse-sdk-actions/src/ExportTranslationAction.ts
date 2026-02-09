import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExportTranslation action
 */
export interface ExportTranslationResponse {
  ExportTranslationFile: string;
}

/**
 * ExportTranslation action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.solution))
 */
export class ExportTranslationAction implements Executable<ExportTranslationResponse> {
  constructor(public readonly solutionName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportTranslation`;

    const body: Record<string, unknown> = {
      SolutionName: this.solutionName,
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

  async parseResponse(response: Response): Promise<ExportTranslationResponse> {
    const data = await response.json();
    return data as ExportTranslationResponse;
  }
}
