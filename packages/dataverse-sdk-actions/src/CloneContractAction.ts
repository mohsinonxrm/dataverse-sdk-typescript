import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the CloneContract action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneContractActionParameters {
  IncludeCanceledLines: boolean;
}

/**
 * CloneContract action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contract)
 *
 * The first argument is the id of the contract record to call it on.
 */
export class CloneContractAction implements Executable<CloneContractResponse> {
  constructor(
    public readonly contractId: string,
    public readonly parameters: CloneContractActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${this.contractId})/Microsoft.Dynamics.CRM.CloneContract`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CloneContractResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CloneContractResponse;
    return (await response.json()) as CloneContractResponse;
  }
}
