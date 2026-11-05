import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetFavoriteArticles request message
 *
 * Web API Action: msdyn_GetFavoriteArticles
 */
export class msdyn_GetFavoriteArticlesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFavoriteArticlesResponse>
{
  constructor(public msdyn_userid: string) {
    super("msdyn_GetFavoriteArticles");
  }

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
    return msdyn_GetFavoriteArticlesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_userid: this.msdyn_userid,
    };
  }
}

/**
 * msdyn_GetFavoriteArticles response message
 */
export class msdyn_GetFavoriteArticlesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFavoriteArticlesResponse) {
    super("msdyn_GetFavoriteArticles");
  }

  static fromResponse(data: unknown): msdyn_GetFavoriteArticlesResponse {
    return new msdyn_GetFavoriteArticlesResponse((data as any).value);
  }
}
