import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CustomApiCustomerServiceCaseSummary action
 */
export interface msdyn_CustomApiCustomerServiceCaseSummaryResponse {
  msdyn_CaseSummary: string;
}

/**
 * msdyn_CustomApiCustomerServiceCaseSummary action
 *
 * Unbound action
 */
export class msdyn_CustomApiCustomerServiceCaseSummaryAction implements Executable<msdyn_CustomApiCustomerServiceCaseSummaryResponse> {
  constructor(public readonly msdyn_CaseNumber: string) {}

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
    return data as msdyn_CustomApiCustomerServiceCaseSummaryResponse;
  }
}
