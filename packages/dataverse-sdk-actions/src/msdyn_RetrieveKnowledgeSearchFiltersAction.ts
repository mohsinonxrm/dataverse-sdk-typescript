import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveKnowledgeSearchFilters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKnowledgeSearchFiltersResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveKnowledgeSearchFiltersResponse;
  }
}
