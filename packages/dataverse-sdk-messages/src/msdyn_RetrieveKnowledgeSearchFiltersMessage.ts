import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKnowledgeSearchFiltersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKnowledgeSearchFilters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKnowledgeSearchFiltersResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchFilters response message
 *
 * `result` is the value the msdyn_RetrieveKnowledgeSearchFilters action returns (see {@link msdyn_RetrieveKnowledgeSearchFiltersResult}).
 */
export class msdyn_RetrieveKnowledgeSearchFiltersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSearchFiltersResult) {
    super("msdyn_RetrieveKnowledgeSearchFilters");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSearchFiltersResponse {
    return new msdyn_RetrieveKnowledgeSearchFiltersResponse(
      data as msdyn_RetrieveKnowledgeSearchFiltersResult
    );
  }
}
