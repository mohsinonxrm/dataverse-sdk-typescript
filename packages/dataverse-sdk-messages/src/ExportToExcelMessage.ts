import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type {
  ExportToExcelResponse as ExportToExcelResponseData,
  InputArgumentCollection,
} from "./types/index.js";

/**
 * ExportToExcel request message
 *
 * Web API Action: ExportToExcel
 */
export class ExportToExcelRequest
  extends OrganizationRequest
  implements Executable<ExportToExcelResponse>
{
  constructor(
    public view: EntityReference | AnyEntityPayload,
    public fetchXml: string,
    public layoutXml: string,
    public queryApi: string,
    public queryParameters: InputArgumentCollection
  ) {
    super("ExportToExcel");
  }

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
    return ExportToExcelResponse.fromResponse(data);
  }
}

/**
 * ExportToExcel response message
 */
export class ExportToExcelResponse extends OrganizationResponse {
  constructor(public result: ExportToExcelResponseData) {
    super("ExportToExcel");
  }

  static fromResponse(data: unknown): ExportToExcelResponse {
    return new ExportToExcelResponse(responseObject<ExportToExcelResponseData>(data));
  }
}
