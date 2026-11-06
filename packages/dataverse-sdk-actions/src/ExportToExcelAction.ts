import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InputArgumentCollection } from "./types/index.js";

/**
 * Response from ExportToExcel action
 */
export interface ExportToExcelResponse {
  ExcelFile: string;
}

/**
 * ExportToExcel action
 *
 * Unbound action
 */
export class ExportToExcelAction implements Executable<ExportToExcelResponse> {
  constructor(
    public readonly view: EntityReference | AnyEntityPayload,
    public readonly fetchXml: string,
    public readonly layoutXml: string,
    public readonly queryApi: string,
    public readonly queryParameters: InputArgumentCollection
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportToExcel`;

    const body: Record<string, unknown> = {
      View: this.view,
      FetchXml: this.fetchXml,
      LayoutXml: this.layoutXml,
      QueryApi: this.queryApi,
      QueryParameters: this.queryParameters,
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

  async parseResponse(response: Response): Promise<ExportToExcelResponse> {
    const data = await response.json();
    return data as ExportToExcelResponse;
  }
}
