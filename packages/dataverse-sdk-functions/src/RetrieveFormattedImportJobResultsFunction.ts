import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the RetrieveFormattedImportJobResults function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFormattedImportJobResultsResponse {
  "@odata.context"?: string;
  FormattedResults: string;
}

/**
 * Parameters of the RetrieveFormattedImportJobResults function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFormattedImportJobResultsFunctionParameters {
  ImportJobId: string;
}

/**
 * RetrieveFormattedImportJobResults function
 *
 * Unbound function
 */
export class RetrieveFormattedImportJobResultsFunction implements Executable<RetrieveFormattedImportJobResultsResponse> {
  constructor(public readonly parameters: RetrieveFormattedImportJobResultsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveFormattedImportJobResults`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ImportJobId !== undefined) {
      aliases.push(`ImportJobId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ImportJobId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveFormattedImportJobResultsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveFormattedImportJobResultsResponse;
  }
}
