import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateKBArticleResponse as msdyn_UpdateKBArticleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateKBArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateKBArticleRequestParameters {
  DoesKBExistResponse3: string;
  CSCopilotRequest3: string;
}

/**
 * msdyn_UpdateKBArticle request message
 *
 * Web API Action: msdyn_UpdateKBArticle
 */
export class msdyn_UpdateKBArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateKBArticleResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateKBArticleRequestParameters>;

  constructor(parameters: msdyn_UpdateKBArticleRequestParameters) {
    super("msdyn_UpdateKBArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKBArticle`;

    const body = requestBody({
      DoesKBExistResponse3: this.Parameters.DoesKBExistResponse3,
      CSCopilotRequest3: this.Parameters.CSCopilotRequest3,
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
    if (response.status === 204) return msdyn_UpdateKBArticleResponse.fromResponse({});
    return msdyn_UpdateKBArticleResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateKBArticle response message
 */
export class msdyn_UpdateKBArticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateKBArticleResponseData) {
    super("msdyn_UpdateKBArticle");
  }

  static fromResponse(data: unknown): msdyn_UpdateKBArticleResponse {
    return new msdyn_UpdateKBArticleResponse(
      responseObject<msdyn_UpdateKBArticleResponseData>(data)
    );
  }
}
