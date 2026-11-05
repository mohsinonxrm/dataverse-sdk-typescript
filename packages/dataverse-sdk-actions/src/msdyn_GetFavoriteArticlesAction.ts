import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFavoriteArticles action
 */
export interface msdyn_GetFavoriteArticlesResponse {
  msdyn_response: string;
}

/**
 * msdyn_GetFavoriteArticles action
 *
 * Unbound action
 */
export class msdyn_GetFavoriteArticlesAction implements Executable<msdyn_GetFavoriteArticlesResponse> {
  constructor(public readonly msdyn_userid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFavoriteArticles`;

    const body: Record<string, unknown> = {
      msdyn_userid: this.msdyn_userid,
    };

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
    const data = await response.json();
    return data as msdyn_GetFavoriteArticlesResponse;
  }
}
