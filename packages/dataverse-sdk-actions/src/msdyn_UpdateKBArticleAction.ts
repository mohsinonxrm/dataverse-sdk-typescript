import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateKBArticle action
 */
export interface msdyn_UpdateKBArticleResponse {
  Response3: string;
}

/**
 * Parameters of the msdyn_UpdateKBArticle action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateKBArticleActionParameters {
  DoesKBExistResponse3: string;
  CSCopilotRequest3: string;
}

/**
 * msdyn_UpdateKBArticle action
 *
 * Unbound action
 */
export class msdyn_UpdateKBArticleAction implements Executable<msdyn_UpdateKBArticleResponse> {
  constructor(public readonly parameters: msdyn_UpdateKBArticleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKBArticle`;

    const body = requestBody({
      DoesKBExistResponse3: this.parameters.DoesKBExistResponse3,
      CSCopilotRequest3: this.parameters.CSCopilotRequest3,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateKBArticleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateKBArticleResponse;
    return (await response.json()) as msdyn_UpdateKBArticleResponse;
  }
}
