import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateKBArticle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateKBArticleResponse {
  "@odata.context"?: string;
  Response3: string;
  usage: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateKBArticleResponse;
  }
}
