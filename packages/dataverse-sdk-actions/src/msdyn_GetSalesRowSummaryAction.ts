import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSalesRowSummary action
 */
export interface msdyn_GetSalesRowSummaryResponse {
  Result: string;
}

/**
 * msdyn_GetSalesRowSummary action
 *
 * Unbound action
 */
export class msdyn_GetSalesRowSummaryAction implements Executable<msdyn_GetSalesRowSummaryResponse> {
  constructor(
    public readonly clientContext: string,
    public readonly otherData: string
  ) {}

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
    return data as msdyn_GetSalesRowSummaryResponse;
  }
}
