import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Parameters of the BulkRetain message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkRetainRequestParameters {
  EntityName?: string;
  FetchXml: string;
  PageSize?: number;
  OperationId?: string;
  PagingCookie?: string;
}

/**
 * BulkRetain request message
 *
 * Web API Action: BulkRetain
 */
export class BulkRetainRequest
  extends OrganizationRequest
  implements Executable<BulkRetainResponse>
{
  declare readonly Parameters: Readonly<BulkRetainRequestParameters>;

  constructor(parameters: BulkRetainRequestParameters) {
    super("BulkRetain", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkRetain`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      FetchXml: this.Parameters.FetchXml,
      PageSize: this.Parameters.PageSize,
      OperationId: this.Parameters.OperationId,
      PagingCookie: this.Parameters.PagingCookie,
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
    return BulkRetainResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BulkRetain action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BulkRetainResult {
  "@odata.context"?: string;
  EntityCountCollection: EntityRecordCountCollection;
  FailedRecords: number;
  HasMoreRecords: boolean;
  MaxMarkedVersion: number;
  PagingCookie: string;
}

/**
 * BulkRetain response message
 *
 * `result` is the value the BulkRetain action returns (see {@link BulkRetainResult}).
 */
export class BulkRetainResponse extends OrganizationResponse {
  constructor(public result: BulkRetainResult) {
    super("BulkRetain");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BulkRetainResponse {
    return new BulkRetainResponse(data as BulkRetainResult);
  }
}
