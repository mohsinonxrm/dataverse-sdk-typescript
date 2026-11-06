import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { BulkRetainResponse as BulkRetainResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return BulkRetainResponse.fromResponse({});
    return BulkRetainResponse.fromResponse(await response.json());
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
