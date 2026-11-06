import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AISummarize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AISummarizeResponse {
  "@odata.context"?: string;
  SummarizedText: string;
}

/**
 * Parameters of the AISummarize action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISummarizeActionParameters {
  Text: string;
}

/**
 * AISummarize action
 *
 * Unbound action
 */
export class AISummarizeAction implements Executable<AISummarizeResponse> {
  constructor(public readonly parameters: AISummarizeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarize`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<AISummarizeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AISummarizeResponse;
  }
}
