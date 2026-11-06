import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PurgeRetainedContentResponse as PurgeRetainedContentResponseData } from "./types/index.js";

/**
 * Parameters of the PurgeRetainedContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PurgeRetainedContentRequestParameters {
  EntityName?: string;
  PageSize?: number;
  OperationId?: string;
  MaxVersionToPurge: number;
}

/**
 * PurgeRetainedContent request message
 *
 * Web API Action: PurgeRetainedContent
 */
export class PurgeRetainedContentRequest
  extends OrganizationRequest
  implements Executable<PurgeRetainedContentResponse>
{
  declare readonly Parameters: Readonly<PurgeRetainedContentRequestParameters>;

  constructor(parameters: PurgeRetainedContentRequestParameters) {
    super("PurgeRetainedContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PurgeRetainedContent`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      PageSize: this.Parameters.PageSize,
      OperationId: this.Parameters.OperationId,
      MaxVersionToPurge: this.Parameters.MaxVersionToPurge,
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

  async parseResponse(response: Response): Promise<PurgeRetainedContentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return PurgeRetainedContentResponse.fromResponse({});
    return PurgeRetainedContentResponse.fromResponse(await response.json());
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
