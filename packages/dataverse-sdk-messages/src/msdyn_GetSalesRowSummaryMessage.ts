import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSalesRowSummaryResponse as msdyn_GetSalesRowSummaryResponseData } from "./types/index.js";

/**
 * msdyn_GetSalesRowSummary request message
 *
 * Web API Action: msdyn_GetSalesRowSummary
 */
export class msdyn_GetSalesRowSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesRowSummaryResponse>
{
  constructor(
    public clientContext?: string,
    public otherData?: string
  ) {
    super("msdyn_GetSalesRowSummary");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesRowSummary`;

    const body: Record<string, unknown> = {
      ClientContext: this.clientContext,
      OtherData: this.otherData,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesRowSummaryResponse> {
    const data = await response.json();
    return msdyn_GetSalesRowSummaryResponse.fromResponse(data);
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
