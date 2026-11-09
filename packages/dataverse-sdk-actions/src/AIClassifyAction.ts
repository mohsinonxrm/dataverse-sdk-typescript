import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AIClassify action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AIClassifyResponse {
  "@odata.context"?: string;
  Classification: string;
}

/**
 * Parameters of the AIClassify action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIClassifyActionParameters {
  Text: string;
  Categories: string[];
}

/**
 * AIClassify action
 *
 * Unbound action
 */
export class AIClassifyAction implements Executable<AIClassifyResponse> {
  constructor(public readonly parameters: AIClassifyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIClassify`;

    const body = requestBody({
      Text: this.parameters.Text,
      Categories: this.parameters.Categories,
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

  async parseResponse(response: Response): Promise<AIClassifyResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AIClassifyResponse;
  }
}
