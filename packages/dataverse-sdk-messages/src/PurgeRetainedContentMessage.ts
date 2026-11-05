import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PurgeRetainedContent request message
 *
 * Web API Action: PurgeRetainedContent
 */
export class PurgeRetainedContentRequest
  extends OrganizationRequest
  implements Executable<PurgeRetainedContentResponse>
{
  constructor(
    public entityName: string,
    public pageSize: number,
    public operationId: string,
    public maxVersionToPurge: number
  ) {
    super("PurgeRetainedContent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PurgeRetainedContent`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      PageSize: this.pageSize,
      OperationId: this.operationId,
      MaxVersionToPurge: this.maxVersionToPurge,
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

  async parseResponse(response: Response): Promise<PurgeRetainedContentResponse> {
    const data = await response.json();
    return PurgeRetainedContentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityName: this.entityName,
      PageSize: this.pageSize,
      OperationId: this.operationId,
      MaxVersionToPurge: this.maxVersionToPurge,
    };
  }
}

/**
 * PurgeRetainedContent response message
 */
export class PurgeRetainedContentResponse extends OrganizationResponse {
  constructor(public result: PurgeRetainedContentResponse) {
    super("PurgeRetainedContent");
  }

  static fromResponse(data: unknown): PurgeRetainedContentResponse {
    return new PurgeRetainedContentResponse((data as any).value);
  }
}
