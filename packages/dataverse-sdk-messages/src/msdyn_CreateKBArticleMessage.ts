import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateKBArticleResponse as msdyn_CreateKBArticleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateKBArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateKBArticleRequestParameters {
  CSCopilotRequest2: string;
}

/**
 * msdyn_CreateKBArticle request message
 *
 * Web API Action: msdyn_CreateKBArticle
 */
export class msdyn_CreateKBArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateKBArticleResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateKBArticleRequestParameters>;

  constructor(parameters: msdyn_CreateKBArticleRequestParameters) {
    super("msdyn_CreateKBArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateKBArticle`;

    const body = requestBody({
      CSCopilotRequest2: this.Parameters.CSCopilotRequest2,
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
    if (response.status === 204) return msdyn_CreateKBArticleResponse.fromResponse({});
    return msdyn_CreateKBArticleResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateKBArticle response message
 */
export class msdyn_CreateKBArticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateKBArticleResponseData) {
    super("msdyn_CreateKBArticle");
  }

  static fromResponse(data: unknown): msdyn_CreateKBArticleResponse {
    return new msdyn_CreateKBArticleResponse(
      responseObject<msdyn_CreateKBArticleResponseData>(data)
    );
  }
}
