import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFavoriteArticlesResponse as msdyn_GetFavoriteArticlesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetFavoriteArticles message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFavoriteArticlesRequestParameters {
  msdyn_userid: string;
}

/**
 * msdyn_GetFavoriteArticles request message
 *
 * Web API Action: msdyn_GetFavoriteArticles
 */
export class msdyn_GetFavoriteArticlesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFavoriteArticlesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFavoriteArticlesRequestParameters>;

  constructor(parameters: msdyn_GetFavoriteArticlesRequestParameters) {
    super("msdyn_GetFavoriteArticles", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFavoriteArticles`;

    const body = requestBody({
      msdyn_userid: this.Parameters.msdyn_userid,
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
    if (response.status === 204) return msdyn_GetFavoriteArticlesResponse.fromResponse({});
    return msdyn_GetFavoriteArticlesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFavoriteArticles response message
 */
export class msdyn_GetFavoriteArticlesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFavoriteArticlesResponseData) {
    super("msdyn_GetFavoriteArticles");
  }

  static fromResponse(data: unknown): msdyn_GetFavoriteArticlesResponse {
    return new msdyn_GetFavoriteArticlesResponse(
      responseObject<msdyn_GetFavoriteArticlesResponseData>(data)
    );
  }
}
