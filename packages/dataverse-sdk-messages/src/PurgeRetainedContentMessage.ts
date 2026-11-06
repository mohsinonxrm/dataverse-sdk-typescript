import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PurgeRetainedContentResponse as PurgeRetainedContentResponseData } from "./types/index.js";

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
    public entityName: string | undefined,
    public pageSize: number | undefined,
    public operationId: string | undefined,
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
}

/**
 * PurgeRetainedContent response message
 */
export class PurgeRetainedContentResponse extends OrganizationResponse {
  constructor(public result: PurgeRetainedContentResponseData) {
    super("PurgeRetainedContent");
  }

  static fromResponse(data: unknown): PurgeRetainedContentResponse {
    return new PurgeRetainedContentResponse(responseObject<PurgeRetainedContentResponseData>(data));
  }
}
