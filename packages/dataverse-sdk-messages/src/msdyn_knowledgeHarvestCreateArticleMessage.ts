import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_knowledgeHarvestCreateArticle request message
 *
 * Web API Action: msdyn_knowledgeHarvestCreateArticle
 */
export class msdyn_knowledgeHarvestCreateArticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_knowledgeHarvestCreateArticleResponse>
{
  constructor(
    public msdyn_knowledgeHarvestJobId: string,
    public msdyn_entityName: string,
    public msdyn_entityId: string,
    public msdyn_payload: string
  ) {
    super("msdyn_knowledgeHarvestCreateArticle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestCreateArticle`;

    const body: Record<string, unknown> = {
      msdyn_knowledgeHarvestJobId: this.msdyn_knowledgeHarvestJobId,
      msdyn_entityName: this.msdyn_entityName,
      msdyn_entityId: this.msdyn_entityId,
      msdyn_payload: this.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_knowledgeHarvestCreateArticleResponse> {
    const data = await response.json();
    return msdyn_knowledgeHarvestCreateArticleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_knowledgeHarvestJobId: this.msdyn_knowledgeHarvestJobId,
      msdyn_entityName: this.msdyn_entityName,
      msdyn_entityId: this.msdyn_entityId,
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_knowledgeHarvestCreateArticle response message
 */
export class msdyn_knowledgeHarvestCreateArticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_knowledgeHarvestCreateArticleResponse) {
    super("msdyn_knowledgeHarvestCreateArticle");
  }

  static fromResponse(data: unknown): msdyn_knowledgeHarvestCreateArticleResponse {
    return new msdyn_knowledgeHarvestCreateArticleResponse((data as any).value);
  }
}
