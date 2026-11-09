import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the GetDistinctValuesImportFile function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetDistinctValuesImportFileResponse {
  "@odata.context"?: string;
  Values: string[];
}

/**
 * Parameters of the GetDistinctValuesImportFile function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetDistinctValuesImportFileFunctionParameters {
  columnNumber: number;
  pageNumber: number;
  recordsPerPage: number;
}

/**
 * GetDistinctValuesImportFile function
 *
 * Bound function
 * Binding parameter: entity (mscrm.importfile)
 *
 * The first argument is the id of the importfile record to call it on.
 */
export class GetDistinctValuesImportFileFunction implements Executable<GetDistinctValuesImportFileResponse> {
  constructor(
    public readonly importfileId: string,
    public readonly parameters: GetDistinctValuesImportFileFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/importfiles(${odataLiteral.guid(this.importfileId)})/Microsoft.Dynamics.CRM.GetDistinctValuesImportFile`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.columnNumber !== undefined) {
      aliases.push(`columnNumber=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.columnNumber, "Edm.Int32"));
    }
    if (this.parameters.pageNumber !== undefined) {
      aliases.push(`pageNumber=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.pageNumber, "Edm.Int32"));
    }
    if (this.parameters.recordsPerPage !== undefined) {
      aliases.push(`recordsPerPage=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.recordsPerPage, "Edm.Int32"));
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetDistinctValuesImportFileResponse;
  }
}
