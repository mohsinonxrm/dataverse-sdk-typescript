import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CancelContract action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CancelContractResponse = void;

/**
 * Parameters of the CancelContract action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CancelContractActionParameters {
  CancelDate: string;
  Status: number;
}

/**
 * CancelContract action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contract)
 *
 * The first argument is the id of the contract record to call it on.
 */
export class CancelContractAction implements Executable<CancelContractResponse> {
  constructor(
    public readonly contractId: string,
    public readonly parameters: CancelContractActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contracts(${odataLiteral.guid(this.contractId)})/Microsoft.Dynamics.CRM.CancelContract`;

    const body = requestBody({
      CancelDate: this.parameters.CancelDate,
      Status: this.parameters.Status,
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

  parseResponse(_response: Response): Promise<CancelContractResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
