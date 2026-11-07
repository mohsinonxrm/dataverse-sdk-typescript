import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the RetrieveCascadeDeleteAsyncJobId function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveCascadeDeleteAsyncJobIdResponse {
  "@odata.context"?: string;
  AsyncJobId: string;
  AsyncJobName: string;
}

/**
 * Parameters of the RetrieveCascadeDeleteAsyncJobId function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCascadeDeleteAsyncJobIdFunctionParameters {
  ParentEntityIds: string[];
}

/**
 * RetrieveCascadeDeleteAsyncJobId function
 *
 * Unbound function
 */
export class RetrieveCascadeDeleteAsyncJobIdFunction implements Executable<RetrieveCascadeDeleteAsyncJobIdResponse> {
  constructor(public readonly parameters: RetrieveCascadeDeleteAsyncJobIdFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCascadeDeleteAsyncJobId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ParentEntityIds !== undefined) {
      aliases.push(`ParentEntityIds=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.ParentEntityIds, "Collection(Edm.Guid)", "Collection")
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveCascadeDeleteAsyncJobIdResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveCascadeDeleteAsyncJobIdResponse;
  }
}
