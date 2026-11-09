import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AITranslate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AITranslateResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AITranslateResponse;
  }
}
