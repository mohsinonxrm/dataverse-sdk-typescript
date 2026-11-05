import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CancelContract action
 */
export interface CancelContractResponse {
  // No content returned
}

/**
 * CancelContract action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contract)
 */
export class CancelContractAction implements Executable<CancelContractResponse> {
  constructor(
    public readonly contractId: string,
    public readonly cancelDate: string,
    public readonly status: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.CancelContract`;

    const body: Record<string, unknown> = {
      CancelDate: this.cancelDate,
      Status: this.status,
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

  async parseResponse(response: Response): Promise<CancelContractResponse> {
    // No return value (204 No Content)
    return {};
  }
}
