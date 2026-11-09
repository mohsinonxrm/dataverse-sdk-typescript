import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RecognizeText action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RecognizeTextResponse {
  "@odata.context"?: string;
  countOfPages: number;
}

/**
 * Parameters of the RecognizeText action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RecognizeTextActionParameters {
  modelId?: string;
  base64encoded: string;
  source?: string;
}

/**
 * RecognizeText action
 *
 * Unbound action
 */
export class RecognizeTextAction implements Executable<RecognizeTextResponse> {
  constructor(public readonly parameters: RecognizeTextActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RecognizeText`;

    const body = requestBody({
      modelId: this.parameters.modelId,
      base64encoded: this.parameters.base64encoded,
      source: this.parameters.source,
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

  async parseResponse(response: Response): Promise<RecognizeTextResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RecognizeTextResponse;
  }
}
