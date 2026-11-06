import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateKBArticleResponse as msdyn_CreateKBArticleResponseData } from "./types/index.js";

/**
 * msdyn_CreateKBArticle request message
 *
 * Web API Action: msdyn_CreateKBArticle
 */
export class msdyn_CreateKBArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateKBArticleResponse>
{
  constructor(public cSCopilotRequest2: string) {
    super("msdyn_CreateKBArticle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateKBArticle`;

    const body: Record<string, unknown> = {
      CSCopilotRequest2: this.cSCopilotRequest2,
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

  async parseResponse(response: Response): Promise<msdyn_CreateKBArticleResponse> {
    const data = await response.json();
    return msdyn_CreateKBArticleResponse.fromResponse(data);
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
