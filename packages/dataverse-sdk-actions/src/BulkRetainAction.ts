import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from the BulkRetain action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BulkRetainResponse {
  "@odata.context"?: string;
  EntityCountCollection: EntityRecordCountCollection;
  FailedRecords: number;
  HasMoreRecords: boolean;
  MaxMarkedVersion: number;
  PagingCookie: string;
}

/**
 * Parameters of the BulkRetain action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkRetainActionParameters {
  EntityName?: string;
  FetchXml: string;
  PageSize?: number;
  OperationId?: string;
  PagingCookie?: string;
}

/**
 * BulkRetain action
 *
 * Unbound action
 */
export class BulkRetainAction implements Executable<BulkRetainResponse> {
  constructor(public readonly parameters: BulkRetainActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkRetain`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
      FetchXml: this.parameters.FetchXml,
      PageSize: this.parameters.PageSize,
      OperationId: this.parameters.OperationId,
      PagingCookie: this.parameters.PagingCookie,
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

  async parseResponse(response: Response): Promise<BulkRetainResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as BulkRetainResponse;
  }
}
