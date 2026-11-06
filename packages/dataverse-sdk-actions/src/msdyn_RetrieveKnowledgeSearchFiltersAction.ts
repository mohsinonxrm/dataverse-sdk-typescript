import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveKnowledgeSearchFilters action
 */
export interface msdyn_RetrieveKnowledgeSearchFiltersResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveKnowledgeSearchFilters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeSearchFiltersActionParameters {
  SearchFiltersMetadata?: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchFilters action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeSearchFiltersAction implements Executable<msdyn_RetrieveKnowledgeSearchFiltersResponse> {
  constructor(
    public readonly parameters: msdyn_RetrieveKnowledgeSearchFiltersActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSearchFilters`;

    const body = requestBody({
      SearchFiltersMetadata: this.parameters.SearchFiltersMetadata,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveKnowledgeSearchFiltersResponse;
    return (await response.json()) as msdyn_RetrieveKnowledgeSearchFiltersResponse;
  }
}
