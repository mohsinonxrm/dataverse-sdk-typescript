import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveCascadeAssignAsyncJobId function
 */
export interface RetrieveCascadeAssignAsyncJobIdResponse {
  AsyncJobName: string;
  AsyncJobId: string;
}

/**
 * Parameters of the RetrieveCascadeAssignAsyncJobId function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCascadeAssignAsyncJobIdFunctionParameters {
  ParentEntityId: string;
}

/**
 * RetrieveCascadeAssignAsyncJobId function
 *
 * Unbound function
 */
export class RetrieveCascadeAssignAsyncJobIdFunction implements Executable<RetrieveCascadeAssignAsyncJobIdResponse> {
  constructor(public readonly parameters: RetrieveCascadeAssignAsyncJobIdFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCascadeAssignAsyncJobId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ParentEntityId !== undefined) {
      aliases.push(`ParentEntityId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ParentEntityId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveCascadeAssignAsyncJobIdResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveCascadeAssignAsyncJobIdResponse;
    return (await response.json()) as RetrieveCascadeAssignAsyncJobIdResponse;
  }
}
