import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_knowledgeHarvestCreateArticleResponse as msdyn_knowledgeHarvestCreateArticleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_knowledgeHarvestCreateArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_knowledgeHarvestCreateArticleRequestParameters {
  msdyn_knowledgeHarvestJobId: string;
  msdyn_entityName: string;
  msdyn_entityId: string;
  msdyn_payload: string;
}

/**
 * msdyn_knowledgeHarvestCreateArticle request message
 *
 * Web API Action: msdyn_knowledgeHarvestCreateArticle
 */
export class msdyn_knowledgeHarvestCreateArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_knowledgeHarvestCreateArticleResponse>
{
  declare readonly Parameters: Readonly<msdyn_knowledgeHarvestCreateArticleRequestParameters>;

  constructor(parameters: msdyn_knowledgeHarvestCreateArticleRequestParameters) {
    super("msdyn_knowledgeHarvestCreateArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestCreateArticle`;

    const body = requestBody({
      msdyn_knowledgeHarvestJobId: this.Parameters.msdyn_knowledgeHarvestJobId,
      msdyn_entityName: this.Parameters.msdyn_entityName,
      msdyn_entityId: this.Parameters.msdyn_entityId,
      msdyn_payload: this.Parameters.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_knowledgeHarvestCreateArticleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_knowledgeHarvestCreateArticleResponse.fromResponse({});
    return msdyn_knowledgeHarvestCreateArticleResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_knowledgeHarvestCreateArticle response message
 */
export class msdyn_knowledgeHarvestCreateArticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_knowledgeHarvestCreateArticleResponseData) {
    super("msdyn_knowledgeHarvestCreateArticle");
  }

  static fromResponse(data: unknown): msdyn_knowledgeHarvestCreateArticleResponse {
    return new msdyn_knowledgeHarvestCreateArticleResponse(
      responseObject<msdyn_knowledgeHarvestCreateArticleResponseData>(data)
    );
  }
}
