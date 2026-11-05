import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdateKBArticleResponse as msdyn_UpdateKBArticleResponseData } from "./types/index.js";

/**
 * msdyn_UpdateKBArticle request message
 *
 * Web API Action: msdyn_UpdateKBArticle
 */
export class msdyn_UpdateKBArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateKBArticleResponse>
{
  constructor(
    public doesKBExistResponse3: string,
    public cSCopilotRequest3: string
  ) {
    super("msdyn_UpdateKBArticle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKBArticle`;

    const body: Record<string, unknown> = {
      DoesKBExistResponse3: this.doesKBExistResponse3,
      CSCopilotRequest3: this.cSCopilotRequest3,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateKBArticleResponse> {
    const data = await response.json();
    return msdyn_UpdateKBArticleResponse.fromResponse(data);
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
