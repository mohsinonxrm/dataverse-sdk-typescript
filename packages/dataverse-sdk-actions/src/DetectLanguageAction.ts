import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DetectLanguage action
 */
export interface DetectLanguageResponse {
  language: string;
  score: number;
}

/**
 * Parameters of the DetectLanguage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DetectLanguageActionParameters {
  text: string;
  modelId?: string;
  countryHint?: string;
}

/**
 * DetectLanguage action
 *
 * Unbound action
 */
export class DetectLanguageAction implements Executable<DetectLanguageResponse> {
  constructor(public readonly parameters: DetectLanguageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DetectLanguage`;

    const body = requestBody({
      text: this.parameters.text,
      modelId: this.parameters.modelId,
      countryHint: this.parameters.countryHint,
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

  async parseResponse(response: Response): Promise<DetectLanguageResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DetectLanguageResponse;
  }
}
