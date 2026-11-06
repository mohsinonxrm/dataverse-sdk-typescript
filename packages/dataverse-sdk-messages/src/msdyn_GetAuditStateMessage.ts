import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAuditStateResponse as msdyn_GetAuditStateResponseData } from "./types/index.js";

/**
 * msdyn_GetAuditState request message
 *
 * Web API Action: msdyn_GetAuditState
 */
export class msdyn_GetAuditStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAuditStateResponse>
{
  constructor() {
    super("msdyn_GetAuditState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAuditState`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAuditStateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetAuditStateResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetAuditState response message
 */
export class msdyn_GetAuditStateResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAuditStateResponseData) {
    super("msdyn_GetAuditState");
  }

  static fromResponse(data: unknown): msdyn_GetAuditStateResponse {
    return new msdyn_GetAuditStateResponse(responseObject<msdyn_GetAuditStateResponseData>(data));
  }
}
