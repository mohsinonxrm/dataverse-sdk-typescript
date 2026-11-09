import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the GetHeaderColumnsImportFile function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetHeaderColumnsImportFileResponse {
  "@odata.context"?: string;
  Columns: string[];
}

/**
 * GetHeaderColumnsImportFile function
 *
 * Bound function
 * Binding parameter: entity (mscrm.importfile)
 *
 * The first argument is the id of the importfile record to call it on.
 */
export class GetHeaderColumnsImportFileFunction implements Executable<GetHeaderColumnsImportFileResponse> {
  constructor(public readonly importfileId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/importfiles(${odataLiteral.guid(this.importfileId)})/Microsoft.Dynamics.CRM.GetHeaderColumnsImportFile`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetHeaderColumnsImportFileResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetHeaderColumnsImportFileResponse;
  }
}
