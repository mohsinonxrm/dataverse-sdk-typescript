import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { QueryExpression } from "./types/index.js";

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
    public querySet: QueryExpression[],
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

  toRequestBody(): Record<string, unknown> {
    return {
      QuerySet: this.querySet,
      OperationType: this.operationType,
    };
  }
}

/**
 * SyncBulkOperation response message
 */
export class SyncBulkOperationResponse extends OrganizationResponse {
  constructor(public result: SyncBulkOperationResponse) {
    super("SyncBulkOperation");
  }

  static fromResponse(data: unknown): SyncBulkOperationResponse {
    return new SyncBulkOperationResponse((data as any).value);
  }
}
