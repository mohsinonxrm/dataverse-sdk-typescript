import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveKnowledgeSearchFiltersResponse as msdyn_RetrieveKnowledgeSearchFiltersResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveKnowledgeSearchFilters request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeSearchFilters
 */
export class msdyn_RetrieveKnowledgeSearchFiltersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeSearchFiltersResponse>
{
  constructor(public searchFiltersMetadata: string) {
    super("msdyn_RetrieveKnowledgeSearchFilters");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSearchFilters`;

    const body: Record<string, unknown> = {
      SearchFiltersMetadata: this.searchFiltersMetadata,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSearchFiltersResponse> {
    const data = await response.json();
    return msdyn_RetrieveKnowledgeSearchFiltersResponse.fromResponse(data);
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
