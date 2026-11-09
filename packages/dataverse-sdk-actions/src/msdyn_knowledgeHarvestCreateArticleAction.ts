import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_knowledgeHarvestCreateArticle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_knowledgeHarvestCreateArticleResponse {
  "@odata.context"?: string;
  msdyn_apiResponse: string;
}

/**
 * Parameters of the msdyn_knowledgeHarvestCreateArticle action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_knowledgeHarvestCreateArticleActionParameters {
  msdyn_entityName: string;
  msdyn_entityId: string;
  msdyn_additionalInformation?: string;
  msdyn_payload: string;
  msdyn_knowledgeHarvestJobId: string;
}

/**
 * msdyn_knowledgeHarvestCreateArticle action
 *
 * Unbound action
 */
export class msdyn_knowledgeHarvestCreateArticleAction implements Executable<msdyn_knowledgeHarvestCreateArticleResponse> {
  constructor(public readonly parameters: msdyn_knowledgeHarvestCreateArticleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestCreateArticle`;

    const body = requestBody({
      msdyn_entityName: this.parameters.msdyn_entityName,
      msdyn_entityId: this.parameters.msdyn_entityId,
      msdyn_additionalInformation: this.parameters.msdyn_additionalInformation,
      msdyn_payload: this.parameters.msdyn_payload,
      msdyn_knowledgeHarvestJobId: this.parameters.msdyn_knowledgeHarvestJobId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_knowledgeHarvestCreateArticleResponse;
  }
}
