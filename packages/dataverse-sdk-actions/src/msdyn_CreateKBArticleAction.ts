import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateKBArticle action
 */
export interface msdyn_CreateKBArticleResponse {
  Response2: string;
}

/**
 * Parameters of the msdyn_CreateKBArticle action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateKBArticleActionParameters {
  CSCopilotRequest2: string;
}

/**
 * msdyn_CreateKBArticle action
 *
 * Unbound action
 */
export class msdyn_CreateKBArticleAction implements Executable<msdyn_CreateKBArticleResponse> {
  constructor(public readonly parameters: msdyn_CreateKBArticleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateKBArticle`;

    const body = requestBody({
      CSCopilotRequest2: this.parameters.CSCopilotRequest2,
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

  async parseResponse(response: Response): Promise<msdyn_CreateKBArticleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateKBArticleResponse;
    return (await response.json()) as msdyn_CreateKBArticleResponse;
  }
}
