import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFavoriteArticles action
 */
export interface msdyn_GetFavoriteArticlesResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_GetFavoriteArticles action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFavoriteArticlesActionParameters {
  msdyn_userid: string;
}

/**
 * msdyn_GetFavoriteArticles action
 *
 * Unbound action
 */
export class msdyn_GetFavoriteArticlesAction implements Executable<msdyn_GetFavoriteArticlesResponse> {
  constructor(public readonly parameters: msdyn_GetFavoriteArticlesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFavoriteArticles`;

    const body = requestBody({
      msdyn_userid: this.parameters.msdyn_userid,
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

  async parseResponse(response: Response): Promise<msdyn_GetFavoriteArticlesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetFavoriteArticlesResponse;
    return (await response.json()) as msdyn_GetFavoriteArticlesResponse;
  }
}
