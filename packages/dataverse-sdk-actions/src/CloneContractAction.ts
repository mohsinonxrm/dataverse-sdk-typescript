import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { contract } from "./types/index.js";

/**
 * Response from CloneContract action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CloneContractResponse extends contract {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * CloneContract action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contract)
 */
export class CloneContractAction implements Executable<CloneContractResponse> {
  constructor(
    public readonly contractId: string,
    public readonly includeCanceledLines: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.CloneContract`;

    const body: Record<string, unknown> = {
      IncludeCanceledLines: this.includeCanceledLines,
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

  async parseResponse(response: Response): Promise<CloneContractResponse> {
    const data = await response.json();
    return data as CloneContractResponse;
  }
}
