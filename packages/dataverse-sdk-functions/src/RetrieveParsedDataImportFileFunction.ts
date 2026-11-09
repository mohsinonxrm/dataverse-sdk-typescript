import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { PagingInfo, StringCollection } from "./types/index.js";

/**
 * Response from the RetrieveParsedDataImportFile function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveParsedDataImportFileResponse {
  "@odata.context"?: string;
  Values: StringCollection[];
}

/**
 * Parameters of the RetrieveParsedDataImportFile function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveParsedDataImportFileFunctionParameters {
  ImportFileId: string;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveParsedDataImportFile function
 *
 * Unbound function
 */
export class RetrieveParsedDataImportFileFunction implements Executable<RetrieveParsedDataImportFileResponse> {
  constructor(public readonly parameters: RetrieveParsedDataImportFileFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveParsedDataImportFile`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ImportFileId !== undefined) {
      aliases.push(`ImportFileId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ImportFileId, "Edm.Guid"));
    }
    if (this.parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.PagingInfo, "mscrm.PagingInfo", "ComplexType")
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

  async parseResponse(response: Response): Promise<RetrieveParsedDataImportFileResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveParsedDataImportFileResponse;
  }
}
