import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExportRetainedData action
 */
export interface ExportRetainedDataResponse {
  ExportedExcelId: string;
}

/**
 * ExportRetainedData action
 *
 * Unbound action
 */
export class ExportRetainedDataAction implements Executable<ExportRetainedDataResponse> {
  constructor(
    public readonly fetchXml: string,
    public readonly layoutXml: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportRetainedData`;

    const body: Record<string, unknown> = {
      FetchXml: this.fetchXml,
      LayoutXml: this.layoutXml,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ExportRetainedDataResponse> {
    const data = await response.json();
    return data as ExportRetainedDataResponse;
  }
}
