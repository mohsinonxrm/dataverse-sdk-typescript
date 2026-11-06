import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { QueryExpression } from "./types/index.js";

/**
 * Parameters of the SyncBulkOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SyncBulkOperationRequestParameters {
  QuerySet?: QueryExpression[];
  OperationType: number;
}

/**
 * SyncBulkOperation request message
 *
 * Web API Action: SyncBulkOperation
 */
export class SyncBulkOperationRequest
  extends OrganizationRequest
  implements Executable<SyncBulkOperationResponse>
{
  declare readonly Parameters: Readonly<SyncBulkOperationRequestParameters>;

  constructor(parameters: SyncBulkOperationRequestParameters) {
    super("SyncBulkOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncBulkOperation`;

    const body = requestBody({
      QuerySet: enumBody(this.Parameters.QuerySet, "QueryExpression"),
      OperationType: this.Parameters.OperationType,
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
    // The body is the complex value, with its @odata.context
    return SyncBulkOperationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SyncBulkOperation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SyncBulkOperationResult {
  "@odata.context"?: string;
  Result: number;
}

/**
 * SyncBulkOperation response message
 *
 * `result` is the value the SyncBulkOperation action returns (see {@link SyncBulkOperationResult}).
 */
export class SyncBulkOperationResponse extends OrganizationResponse {
  constructor(public result: SyncBulkOperationResult) {
    super("SyncBulkOperation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SyncBulkOperationResponse {
    return new SyncBulkOperationResponse(data as SyncBulkOperationResult);
  }
}
