import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { contract } from "./types/index.js";

/**
 * Response from RenewContract action
 */
export interface RenewContractResponse {
  value: contract;
}

/**
 * RenewContract action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contract)
 */
export class RenewContractAction implements Executable<RenewContractResponse> {
  constructor(
    public readonly contractId: string,
    public readonly status: number,
    public readonly includeCanceledLines: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.RenewContract`;

    const body: Record<string, unknown> = {
      Status: this.status,
      IncludeCanceledLines: this.includeCanceledLines,
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

  async parseResponse(response: Response): Promise<RenewContractResponse> {
    const data = await response.json();
    return data as RenewContractResponse;
  }
}
