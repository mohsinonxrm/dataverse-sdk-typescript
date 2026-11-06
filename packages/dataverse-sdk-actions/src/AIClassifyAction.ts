import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AIClassify action
 */
export interface AIClassifyResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AIClassifyResponse;
    return (await response.json()) as AIClassifyResponse;
  }
}
