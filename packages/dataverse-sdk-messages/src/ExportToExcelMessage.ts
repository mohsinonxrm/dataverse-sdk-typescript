import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InputArgumentCollection } from "./types/index.js";

/**
 * Parameters of the ExportToExcel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportToExcelRequestParameters {
  View: EntityReference | AnyEntityPayload;
  FetchXml: string;
  LayoutXml: string;
  QueryApi: string;
  QueryParameters: InputArgumentCollection;
}

/**
 * ExportToExcel request message
 *
 * Web API Action: ExportToExcel
 */
export class ExportToExcelRequest
  extends OrganizationRequest
  implements Executable<ExportToExcelResponse>
{
  declare readonly Parameters: Readonly<ExportToExcelRequestParameters>;

  constructor(parameters: ExportToExcelRequestParameters) {
    super("ExportToExcel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportToExcel`;

    const body = requestBody({
      View: this.Parameters.View,
      FetchXml: this.Parameters.FetchXml,
      LayoutXml: this.Parameters.LayoutXml,
      QueryApi: this.Parameters.QueryApi,
      QueryParameters: this.Parameters.QueryParameters,
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
    return ExportToExcelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExportToExcel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportToExcelResult {
  "@odata.context"?: string;
  ExcelFile: string;
}

/**
 * ExportToExcel response message
 *
 * `result` is the value the ExportToExcel action returns (see {@link ExportToExcelResult}).
 */
export class ExportToExcelResponse extends OrganizationResponse {
  constructor(public result: ExportToExcelResult) {
    super("ExportToExcel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExportToExcelResponse {
    return new ExportToExcelResponse(data as ExportToExcelResult);
  }
}
