import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_knowledgeHarvestCreateArticle action
 */
export interface msdyn_knowledgeHarvestCreateArticleResponse {
  msdyn_apiResponse: string;
}

/**
 * msdyn_knowledgeHarvestCreateArticle action
 *
 * Unbound action
 */
export class msdyn_knowledgeHarvestCreateArticleAction implements Executable<msdyn_knowledgeHarvestCreateArticleResponse> {
  constructor(
    public readonly msdyn_knowledgeHarvestJobId: string,
    public readonly msdyn_entityName: string,
    public readonly msdyn_entityId: string,
    public readonly msdyn_payload: string
  ) {}

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
    return data as msdyn_knowledgeHarvestCreateArticleResponse;
  }
}
