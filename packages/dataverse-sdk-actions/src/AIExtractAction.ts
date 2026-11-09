import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AIExtract action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AIExtractResponse {
  "@odata.context"?: string;
  ExtractedData: string[];
}

/**
 * Parameters of the AIExtract action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIExtractActionParameters {
  Entity: string;
  Text: string;
}

/**
 * AIExtract action
 *
 * Unbound action
 */
export class AIExtractAction implements Executable<AIExtractResponse> {
  constructor(public readonly parameters: AIExtractActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIExtract`;

    const body = requestBody({
      Entity: this.parameters.Entity,
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

  async parseResponse(response: Response): Promise<AIExtractResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AIExtractResponse;
  }
}
