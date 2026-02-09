import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSearchFiltersResponse> {
    const data = await response.json();
    return msdyn_RetrieveKnowledgeSearchFiltersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SearchFiltersMetadata: this.searchFiltersMetadata,
    };
  }
}

/**
 * msdyn_RetrieveKnowledgeSearchFilters response message
 */
export class msdyn_RetrieveKnowledgeSearchFiltersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSearchFiltersResponse) {
    super("msdyn_RetrieveKnowledgeSearchFilters");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSearchFiltersResponse {
    return new msdyn_RetrieveKnowledgeSearchFiltersResponse((data as any).value);
  }
}
