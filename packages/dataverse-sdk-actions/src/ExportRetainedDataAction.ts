import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ExportRetainedData action
 */
export interface ExportRetainedDataResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ExportRetainedDataResponse;
  }
}
