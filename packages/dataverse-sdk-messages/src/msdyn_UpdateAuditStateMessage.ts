import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateAuditState request message
 *
 * Web API Action: msdyn_UpdateAuditState
 */
export class msdyn_UpdateAuditStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateAuditStateResponse>
{
  constructor(public msdyn_input: string) {
    super("msdyn_UpdateAuditState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAuditState`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateAuditStateResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateAuditStateResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_input: this.msdyn_input,
    };
  }
}

/**
 * msdyn_UpdateAuditState response message
 */
export class msdyn_UpdateAuditStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateAuditState");
  }

  static fromResponse(_data: unknown): msdyn_UpdateAuditStateResponse {
    return new msdyn_UpdateAuditStateResponse();
  }
}
