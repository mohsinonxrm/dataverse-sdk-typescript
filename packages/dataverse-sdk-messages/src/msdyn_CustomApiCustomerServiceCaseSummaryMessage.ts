import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_CaseNumber: this.msdyn_CaseNumber,
    };
  }
}

/**
 * msdyn_CustomApiCustomerServiceCaseSummary response message
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomApiCustomerServiceCaseSummaryResponse) {
    super("msdyn_CustomApiCustomerServiceCaseSummary");
  }

  static fromResponse(data: unknown): msdyn_CustomApiCustomerServiceCaseSummaryResponse {
    return new msdyn_CustomApiCustomerServiceCaseSummaryResponse((data as any).value);
  }
}
