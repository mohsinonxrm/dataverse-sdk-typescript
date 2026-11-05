import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { PagingInfo, StringCollection } from "./types/index.js";

/**
 * Response from RetrieveParsedDataImportFile function
 */
export interface RetrieveParsedDataImportFileResponse {
  Values: StringCollection[];
}

/**
 * RetrieveParsedDataImportFile function
 *
 * Unbound function
 */
export class RetrieveParsedDataImportFileFunction implements Executable<RetrieveParsedDataImportFileResponse> {
  constructor(
    public readonly importFileId: string,
    public readonly pagingInfo: PagingInfo
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveParsedDataImportFile`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.importFileId !== undefined) {
      aliases.push(`ImportFileId=@p1`);
      params.append("@p1", formatAliasValue(this.importFileId));
    }
    if (this.pagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p2`);
      params.append("@p2", JSON.stringify(this.pagingInfo));
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

  async parseResponse(response: Response): Promise<RetrieveParsedDataImportFileResponse> {
    const data = await response.json();
    return data as RetrieveParsedDataImportFileResponse;
  }
}
