import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveKnowledgeSearchFilters action
 */
export interface msdyn_RetrieveKnowledgeSearchFiltersResponse {
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchFilters action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeSearchFiltersAction implements Executable<msdyn_RetrieveKnowledgeSearchFiltersResponse> {
  constructor(public readonly searchFiltersMetadata: string) {}

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
    return data as msdyn_RetrieveKnowledgeSearchFiltersResponse;
  }
}
