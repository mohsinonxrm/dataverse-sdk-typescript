import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ExportRetainedData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportRetainedDataResponse {
  "@odata.context"?: string;
  ExportedExcelId: string;
}

/**
 * Parameters of the ExportRetainedData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportRetainedDataActionParameters {
  FetchXml: string;
  LayoutXml?: string;
}

/**
 * ExportRetainedData action
 *
 * Unbound action
 */
export class ExportRetainedDataAction implements Executable<ExportRetainedDataResponse> {
  constructor(public readonly parameters: ExportRetainedDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportRetainedData`;

    const body = requestBody({
      FetchXml: this.parameters.FetchXml,
      LayoutXml: this.parameters.LayoutXml,
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
    return (await response.json()) as ExportRetainedDataResponse;
  }
}
