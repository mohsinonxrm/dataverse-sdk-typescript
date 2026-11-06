import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CustomApiCustomerServiceCaseSummaryResponse as msdyn_CustomApiCustomerServiceCaseSummaryResponseData } from "./types/index.js";

/**
 * msdyn_CustomApiCustomerServiceCaseSummary request message
 *
 * Web API Action: msdyn_CustomApiCustomerServiceCaseSummary
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomApiCustomerServiceCaseSummaryResponse>
{
  constructor(public msdyn_CaseNumber: string) {
    super("msdyn_CustomApiCustomerServiceCaseSummary");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomApiCustomerServiceCaseSummary`;

    const body: Record<string, unknown> = {
      msdyn_CaseNumber: this.msdyn_CaseNumber,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CustomApiCustomerServiceCaseSummaryResponse> {
    const data = await response.json();
    return msdyn_CustomApiCustomerServiceCaseSummaryResponse.fromResponse(data);
  }
}

/**
 * msdyn_CustomApiCustomerServiceCaseSummary response message
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomApiCustomerServiceCaseSummaryResponseData) {
    super("msdyn_CustomApiCustomerServiceCaseSummary");
  }

  static fromResponse(data: unknown): msdyn_CustomApiCustomerServiceCaseSummaryResponse {
    return new msdyn_CustomApiCustomerServiceCaseSummaryResponse(
      responseObject<msdyn_CustomApiCustomerServiceCaseSummaryResponseData>(data)
    );
  }
}
