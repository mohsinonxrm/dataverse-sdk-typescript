import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetHeaderColumnsImportFile function
 */
export interface GetHeaderColumnsImportFileResponse {
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
    let url = `${baseUrl}/importfiles(${this.importfileId})/Microsoft.Dynamics.CRM.GetHeaderColumnsImportFile`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetHeaderColumnsImportFileResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetHeaderColumnsImportFileResponse;
    return (await response.json()) as GetHeaderColumnsImportFileResponse;
  }
}
