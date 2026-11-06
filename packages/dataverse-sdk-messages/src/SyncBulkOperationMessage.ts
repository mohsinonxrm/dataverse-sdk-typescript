import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  QueryExpression,
  SyncBulkOperationResponse as SyncBulkOperationResponseData,
} from "./types/index.js";

/**
 * SyncBulkOperation request message
 *
 * Web API Action: SyncBulkOperation
 */
export class SyncBulkOperationRequest
  extends OrganizationRequest
  implements Executable<SyncBulkOperationResponse>
{
  constructor(
    public querySet: QueryExpression[] | undefined,
    public operationType: number
  ) {
    super("SyncBulkOperation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncBulkOperation`;

    const body: Record<string, unknown> = {
      QuerySet: this.querySet,
      OperationType: this.operationType,
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

  async parseResponse(response: Response): Promise<SyncBulkOperationResponse> {
    const data = await response.json();
    return SyncBulkOperationResponse.fromResponse(data);
  }
}

/**
 * SyncBulkOperation response message
 */
export class SyncBulkOperationResponse extends OrganizationResponse {
  constructor(public result: SyncBulkOperationResponseData) {
    super("SyncBulkOperation");
  }

  static fromResponse(data: unknown): SyncBulkOperationResponse {
    return new SyncBulkOperationResponse(responseObject<SyncBulkOperationResponseData>(data));
  }
}
