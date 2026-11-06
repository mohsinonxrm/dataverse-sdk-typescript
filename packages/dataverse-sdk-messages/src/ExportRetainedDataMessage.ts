import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ExportRetainedDataResponse as ExportRetainedDataResponseData } from "./types/index.js";

/**
 * ExportRetainedData request message
 *
 * Web API Action: ExportRetainedData
 */
export class ExportRetainedDataRequest
  extends OrganizationRequest
  implements Executable<ExportRetainedDataResponse>
{
  constructor(
    public fetchXml: string,
    public layoutXml: string
  ) {
    super("ExportRetainedData");
  }

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
    return ExportRetainedDataResponse.fromResponse(data);
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
