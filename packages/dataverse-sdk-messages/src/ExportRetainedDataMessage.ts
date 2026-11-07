import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ExportRetainedData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportRetainedDataRequestParameters {
  FetchXml: string;
  LayoutXml?: string;
}

/**
 * ExportRetainedData request message
 *
 * Web API Action: ExportRetainedData
 */
export class ExportRetainedDataRequest
  extends OrganizationRequest
  implements Executable<ExportRetainedDataResponse>
{
  declare readonly Parameters: Readonly<ExportRetainedDataRequestParameters>;

  constructor(parameters: ExportRetainedDataRequestParameters) {
    super("ExportRetainedData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportRetainedData`;

    const body = requestBody({
      FetchXml: this.Parameters.FetchXml,
      LayoutXml: this.Parameters.LayoutXml,
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

  async parseResponse(response: Response): Promise<ExportRetainedDataResponse> {
    // The body is the complex value, with its @odata.context
    return ExportRetainedDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExportRetainedData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportRetainedDataResult {
  "@odata.context"?: string;
  ExportedExcelId: string;
}

/**
 * ExportRetainedData response message
 *
 * `result` is the value the ExportRetainedData action returns (see {@link ExportRetainedDataResult}).
 */
export class ExportRetainedDataResponse extends OrganizationResponse {
  constructor(public result: ExportRetainedDataResult) {
    super("ExportRetainedData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExportRetainedDataResponse {
    return new ExportRetainedDataResponse(data as ExportRetainedDataResult);
  }
}
