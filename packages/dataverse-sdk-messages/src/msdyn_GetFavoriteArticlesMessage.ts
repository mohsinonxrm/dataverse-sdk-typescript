import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetFavoriteArticlesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetFavoriteArticles action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFavoriteArticlesResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_GetFavoriteArticles response message
 *
 * `result` is the value the msdyn_GetFavoriteArticles action returns (see {@link msdyn_GetFavoriteArticlesResult}).
 */
export class msdyn_GetFavoriteArticlesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFavoriteArticlesResult) {
    super("msdyn_GetFavoriteArticles");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetFavoriteArticlesResponse {
    return new msdyn_GetFavoriteArticlesResponse(data as msdyn_GetFavoriteArticlesResult);
  }
}
