import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from GetDistinctValuesImportFile function
 */
export interface GetDistinctValuesImportFileResponse {
  Values: string[];
}

/**
 * GetDistinctValuesImportFile function
 *
 * Bound function
 * Binding parameter: entity (mscrm.importfile)
 */
export class GetDistinctValuesImportFileFunction implements Executable<GetDistinctValuesImportFileResponse> {
  constructor(
    public readonly importfileId: string,
    public readonly columnNumber: number,
    public readonly pageNumber: number,
    public readonly recordsPerPage: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/importfiles(${this.importfileId})/Microsoft.Dynamics.CRM.GetDistinctValuesImportFile`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.columnNumber !== undefined) {
      aliases.push(`columnNumber=@p1`);
      params.append("@p1", formatAliasValue(this.columnNumber));
    }
    if (this.pageNumber !== undefined) {
      aliases.push(`pageNumber=@p2`);
      params.append("@p2", formatAliasValue(this.pageNumber));
    }
    if (this.recordsPerPage !== undefined) {
      aliases.push(`recordsPerPage=@p3`);
      params.append("@p3", formatAliasValue(this.recordsPerPage));
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

  async parseResponse(response: Response): Promise<GetDistinctValuesImportFileResponse> {
    const data = await response.json();
    return data as GetDistinctValuesImportFileResponse;
  }
}
