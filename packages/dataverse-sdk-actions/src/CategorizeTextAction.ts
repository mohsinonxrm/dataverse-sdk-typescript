import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CategorizeText action
 */
export interface CategorizeTextResponse {
  originalText: string;
}

/**
 * Parameters of the CategorizeText action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CategorizeTextActionParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * CategorizeText action
 *
 * Unbound action
 */
export class CategorizeTextAction implements Executable<CategorizeTextResponse> {
  constructor(public readonly parameters: CategorizeTextActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CategorizeText`;

    const body = requestBody({
      text: this.parameters.text,
      modelId: this.parameters.modelId,
      language: this.parameters.language,
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

  async parseResponse(response: Response): Promise<CategorizeTextResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CategorizeTextResponse;
  }
}
