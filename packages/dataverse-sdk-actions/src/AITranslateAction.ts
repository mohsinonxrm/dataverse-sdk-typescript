import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AITranslate action
 */
export interface AITranslateResponse {
  TranslatedText: string;
}

/**
 * Parameters of the AITranslate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AITranslateActionParameters {
  TargetLanguage?: string;
  Text: string;
}

/**
 * AITranslate action
 *
 * Unbound action
 */
export class AITranslateAction implements Executable<AITranslateResponse> {
  constructor(public readonly parameters: AITranslateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AITranslate`;

    const body = requestBody({
      TargetLanguage: this.parameters.TargetLanguage,
      Text: this.parameters.Text,
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

  async parseResponse(response: Response): Promise<AITranslateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AITranslateResponse;
  }
}
