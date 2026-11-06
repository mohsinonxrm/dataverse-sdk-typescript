import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSalesRowSummaryResponse as msdyn_GetSalesRowSummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSalesRowSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesRowSummaryRequestParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetSalesRowSummary request message
 *
 * Web API Action: msdyn_GetSalesRowSummary
 */
export class msdyn_GetSalesRowSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesRowSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesRowSummaryRequestParameters>;

  constructor(parameters: msdyn_GetSalesRowSummaryRequestParameters = {}) {
    super("msdyn_GetSalesRowSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesRowSummary`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
      OtherData: this.Parameters.OtherData,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesRowSummaryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSalesRowSummaryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSalesRowSummary response message
 */
export class msdyn_GetSalesRowSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesRowSummaryResponseData) {
    super("msdyn_GetSalesRowSummary");
  }

  static fromResponse(data: unknown): msdyn_GetSalesRowSummaryResponse {
    return new msdyn_GetSalesRowSummaryResponse(
      responseObject<msdyn_GetSalesRowSummaryResponseData>(data)
    );
  }
}
