import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_BulkForceCloseResponse as CCaaS_BulkForceCloseResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_BulkForceClose message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BulkForceCloseRequestParameters {
  ConversationIds: string[];
  ApiVersion: string;
}

/**
 * CCaaS_BulkForceClose request message
 *
 * Web API Action: CCaaS_BulkForceClose
 */
export class CCaaS_BulkForceCloseRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BulkForceCloseResponse>
{
  declare readonly Parameters: Readonly<CCaaS_BulkForceCloseRequestParameters>;

  constructor(parameters: CCaaS_BulkForceCloseRequestParameters) {
    super("CCaaS_BulkForceClose", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkForceClose`;

    const body = requestBody({
      ConversationIds: this.Parameters.ConversationIds,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_BulkForceCloseResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CCaaS_BulkForceCloseResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CCaaS_BulkForceClose response message
 */
export class CCaaS_BulkForceCloseResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BulkForceCloseResponseData) {
    super("CCaaS_BulkForceClose");
  }

  static fromResponse(data: unknown): CCaaS_BulkForceCloseResponse {
    return new CCaaS_BulkForceCloseResponse(responseObject<CCaaS_BulkForceCloseResponseData>(data));
  }
}
