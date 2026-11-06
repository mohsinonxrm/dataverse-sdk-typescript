import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveKnowledgeSearchFiltersResponse as msdyn_RetrieveKnowledgeSearchFiltersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveKnowledgeSearchFilters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeSearchFiltersRequestParameters {
  SearchFiltersMetadata?: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchFilters request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeSearchFilters
 */
export class msdyn_RetrieveKnowledgeSearchFiltersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeSearchFiltersResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKnowledgeSearchFiltersRequestParameters>;

  constructor(parameters: msdyn_RetrieveKnowledgeSearchFiltersRequestParameters = {}) {
    super("msdyn_RetrieveKnowledgeSearchFilters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSearchFilters`;

    const body = requestBody({
      SearchFiltersMetadata: this.Parameters.SearchFiltersMetadata,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSearchFiltersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveKnowledgeSearchFiltersResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_RetrieveKnowledgeSearchFilters response message
 */
export class msdyn_RetrieveKnowledgeSearchFiltersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSearchFiltersResponseData) {
    super("msdyn_RetrieveKnowledgeSearchFilters");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSearchFiltersResponse {
    return new msdyn_RetrieveKnowledgeSearchFiltersResponse(
      responseObject<msdyn_RetrieveKnowledgeSearchFiltersResponseData>(data)
    );
  }
}
