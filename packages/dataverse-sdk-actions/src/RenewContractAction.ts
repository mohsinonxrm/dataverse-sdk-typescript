import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { contract } from "./types/index.js";

/**
 * Response from RenewContract action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RenewContractResponse extends contract {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the RenewContract action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RenewContractActionParameters {
  Status: number;
  IncludeCanceledLines: boolean;
}

/**
 * RenewContract action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contract)
 *
 * The first argument is the id of the contract record to call it on.
 */
export class RenewContractAction implements Executable<RenewContractResponse> {
  constructor(
    public readonly contractId: string,
    public readonly parameters: RenewContractActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.RenewContract`;

    const body = requestBody({
      Status: this.parameters.Status,
      IncludeCanceledLines: this.parameters.IncludeCanceledLines,
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

  async parseResponse(response: Response): Promise<RenewContractResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RenewContractResponse;
    return (await response.json()) as RenewContractResponse;
  }
}
