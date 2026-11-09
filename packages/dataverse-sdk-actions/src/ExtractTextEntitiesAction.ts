import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ExtractTextEntities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExtractTextEntitiesResponse {
  "@odata.context"?: string;
  originalText: string;
  textScore: number;
}

/**
 * Parameters of the ExtractTextEntities action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExtractTextEntitiesActionParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * ExtractTextEntities action
 *
 * Unbound action
 */
export class ExtractTextEntitiesAction implements Executable<ExtractTextEntitiesResponse> {
  constructor(public readonly parameters: ExtractTextEntitiesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractTextEntities`;

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

  async parseResponse(response: Response): Promise<ExtractTextEntitiesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ExtractTextEntitiesResponse;
  }
}
