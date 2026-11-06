import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ExportRetainedDataResponse as ExportRetainedDataResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return ExportRetainedDataResponse.fromResponse({});
    return ExportRetainedDataResponse.fromResponse(await response.json());
  }
}

/**
 * ExportRetainedData response message
 */
export class ExportRetainedDataResponse extends OrganizationResponse {
  constructor(public result: ExportRetainedDataResponseData) {
    super("ExportRetainedData");
  }

  static fromResponse(data: unknown): ExportRetainedDataResponse {
    return new ExportRetainedDataResponse(responseObject<ExportRetainedDataResponseData>(data));
  }
}
