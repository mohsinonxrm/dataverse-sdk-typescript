import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AIExtract action
 */
export interface AIExtractResponse {
  ExtractedData: string[];
}

/**
 * Parameters of the AIExtract action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIExtractActionParameters {
  Text: string;
  Entity: string;
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
      Text: this.parameters.Text,
      Entity: this.parameters.Entity,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AIExtractResponse;
  }
}
