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
  Categories: string[];
  Text: string;
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
      Categories: this.parameters.Categories,
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

  async parseResponse(response: Response): Promise<AIClassifyResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AIClassifyResponse;
  }
}
