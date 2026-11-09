import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { contract } from "./types/index.js";

/**
 * Response from the RenewContract action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RenewContractResponse =
  (contract & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

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
    const url = `${baseUrl}/contracts(${odataLiteral.guid(this.contractId)})/Microsoft.Dynamics.CRM.RenewContract`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as RenewContractResponse;
  }
}
