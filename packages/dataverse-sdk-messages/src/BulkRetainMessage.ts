import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { BulkRetainResponse as BulkRetainResponseData } from "./types/index.js";

/**
 * BulkRetain request message
 *
 * Web API Action: BulkRetain
 */
export class BulkRetainRequest
  extends OrganizationRequest
  implements Executable<BulkRetainResponse>
{
  constructor(
    public entityName: string,
    public fetchXml: string,
    public pageSize: number,
    public operationId: string,
    public pagingCookie: string
  ) {
    super("BulkRetain");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkRetain`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      FetchXml: this.fetchXml,
      PageSize: this.pageSize,
      OperationId: this.operationId,
      PagingCookie: this.pagingCookie,
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

  async parseResponse(response: Response): Promise<BulkRetainResponse> {
    const data = await response.json();
    return BulkRetainResponse.fromResponse(data);
  }
}

/**
 * BulkRetain response message
 */
export class BulkRetainResponse extends OrganizationResponse {
  constructor(public result: BulkRetainResponseData) {
    super("BulkRetain");
  }

  static fromResponse(data: unknown): BulkRetainResponse {
    return new BulkRetainResponse(responseObject<BulkRetainResponseData>(data));
  }
}
