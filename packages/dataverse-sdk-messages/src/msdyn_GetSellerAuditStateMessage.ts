import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSellerAuditStateResponse as msdyn_GetSellerAuditStateResponseData } from "./types/index.js";

/**
 * msdyn_GetSellerAuditState request message
 *
 * Web API Action: msdyn_GetSellerAuditState
 */
export class msdyn_GetSellerAuditStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSellerAuditStateResponse>
{
  constructor() {
    super("msdyn_GetSellerAuditState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSellerAuditState`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSellerAuditStateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSellerAuditStateResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSellerAuditState response message
 */
export class msdyn_GetSellerAuditStateResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSellerAuditStateResponseData) {
    super("msdyn_GetSellerAuditState");
  }

  static fromResponse(data: unknown): msdyn_GetSellerAuditStateResponse {
    return new msdyn_GetSellerAuditStateResponse(
      responseObject<msdyn_GetSellerAuditStateResponseData>(data)
    );
  }
}
