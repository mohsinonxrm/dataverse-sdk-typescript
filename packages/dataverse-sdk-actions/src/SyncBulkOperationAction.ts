import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { QueryExpression } from "./types/index.js";

/**
 * Response from SyncBulkOperation action
 */
export interface SyncBulkOperationResponse {
  Result: number;
}

/**
 * Parameters of the SyncBulkOperation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SyncBulkOperationActionParameters {
  QuerySet?: QueryExpression[];
  OperationType: number;
}

/**
 * SyncBulkOperation action
 *
 * Unbound action
 */
export class SyncBulkOperationAction implements Executable<SyncBulkOperationResponse> {
  constructor(public readonly parameters: SyncBulkOperationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncBulkOperation`;

    const body = requestBody({
      QuerySet: enumBody(this.parameters.QuerySet, "QueryExpression"),
      OperationType: this.parameters.OperationType,
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

  async parseResponse(response: Response): Promise<SyncBulkOperationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SyncBulkOperationResponse;
    return (await response.json()) as SyncBulkOperationResponse;
  }
}
