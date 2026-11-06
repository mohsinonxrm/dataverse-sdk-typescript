import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ExportTranslation action
 */
export interface ExportTranslationResponse {
  ExportTranslationFile: string;
}

/**
 * Parameters of the ExportTranslation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportTranslationActionParameters {
  SolutionName: string;
}

/**
 * ExportTranslation action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.solution))
 */
export class ExportTranslationAction implements Executable<ExportTranslationResponse> {
  constructor(public readonly parameters: ExportTranslationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/solutions/Microsoft.Dynamics.CRM.ExportTranslation`;

    const body = requestBody({
      SolutionName: this.parameters.SolutionName,
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

  async parseResponse(response: Response): Promise<ExportTranslationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ExportTranslationResponse;
    return (await response.json()) as ExportTranslationResponse;
  }
}
