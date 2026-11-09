import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InputArgumentCollection } from "./types/index.js";

/**
 * Response from the ExportToExcel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportToExcelResponse {
  "@odata.context"?: string;
  ExcelFile: string;
}

/**
 * Parameters of the ExportToExcel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportToExcelActionParameters {
  View: EntityReference | AnyEntityPayload;
  FetchXml: string;
  LayoutXml: string;
  QueryApi: string;
  QueryParameters: InputArgumentCollection;
}

/**
 * ExportToExcel action
 *
 * Unbound action
 */
export class ExportToExcelAction implements Executable<ExportToExcelResponse> {
  constructor(public readonly parameters: ExportToExcelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportToExcel`;

    const body = requestBody({
      View: this.parameters.View,
      FetchXml: this.parameters.FetchXml,
      LayoutXml: this.parameters.LayoutXml,
      QueryApi: this.parameters.QueryApi,
      QueryParameters: this.parameters.QueryParameters,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ExportToExcelResponse;
  }
}
