import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAuditStateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAuditState action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAuditStateResult {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * msdyn_GetAuditState response message
 *
 * `result` is the value the msdyn_GetAuditState action returns (see {@link msdyn_GetAuditStateResult}).
 */
export class msdyn_GetAuditStateResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAuditStateResult) {
    super("msdyn_GetAuditState");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAuditStateResponse {
    return new msdyn_GetAuditStateResponse(data as msdyn_GetAuditStateResult);
  }
}
