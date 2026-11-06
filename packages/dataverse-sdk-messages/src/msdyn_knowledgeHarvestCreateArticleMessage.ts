import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_knowledgeHarvestCreateArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_knowledgeHarvestCreateArticleRequestParameters {
  msdyn_entityName: string;
  msdyn_entityId: string;
  msdyn_additionalInformation?: string;
  msdyn_payload: string;
  msdyn_knowledgeHarvestJobId: string;
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
      msdyn_entityName: this.Parameters.msdyn_entityName,
      msdyn_entityId: this.Parameters.msdyn_entityId,
      msdyn_additionalInformation: this.Parameters.msdyn_additionalInformation,
      msdyn_payload: this.Parameters.msdyn_payload,
      msdyn_knowledgeHarvestJobId: this.Parameters.msdyn_knowledgeHarvestJobId,
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
    return msdyn_knowledgeHarvestCreateArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_knowledgeHarvestCreateArticle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_knowledgeHarvestCreateArticleResult {
  "@odata.context"?: string;
  msdyn_apiResponse: string;
}

/**
 * msdyn_knowledgeHarvestCreateArticle response message
 *
 * `result` is the value the msdyn_knowledgeHarvestCreateArticle action returns (see {@link msdyn_knowledgeHarvestCreateArticleResult}).
 */
export class msdyn_knowledgeHarvestCreateArticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_knowledgeHarvestCreateArticleResult) {
    super("msdyn_knowledgeHarvestCreateArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_knowledgeHarvestCreateArticleResponse {
    return new msdyn_knowledgeHarvestCreateArticleResponse(
      data as msdyn_knowledgeHarvestCreateArticleResult
    );
  }
}
