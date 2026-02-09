import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSellerAuditStateResponse> {
    const data = await response.json();
    return msdyn_GetSellerAuditStateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetSellerAuditState response message
 */
export class msdyn_GetSellerAuditStateResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSellerAuditStateResponse) {
    super("msdyn_GetSellerAuditState");
  }

  static fromResponse(data: unknown): msdyn_GetSellerAuditStateResponse {
    return new msdyn_GetSellerAuditStateResponse((data as any).value);
  }
}
