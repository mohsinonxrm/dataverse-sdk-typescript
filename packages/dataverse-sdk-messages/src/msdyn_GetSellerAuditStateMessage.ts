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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSellerAuditStateResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSellerAuditStateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSellerAuditState action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSellerAuditStateResult {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * msdyn_GetSellerAuditState response message
 *
 * `result` is the value the msdyn_GetSellerAuditState action returns (see {@link msdyn_GetSellerAuditStateResult}).
 */
export class msdyn_GetSellerAuditStateResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSellerAuditStateResult) {
    super("msdyn_GetSellerAuditState");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSellerAuditStateResponse {
    return new msdyn_GetSellerAuditStateResponse(data as msdyn_GetSellerAuditStateResult);
  }
}
