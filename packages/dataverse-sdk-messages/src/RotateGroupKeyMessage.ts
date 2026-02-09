import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RotateGroupKey request message
 *
 * Web API Action: RotateGroupKey
 */
export class RotateGroupKeyRequest
  extends OrganizationRequest
  implements Executable<RotateGroupKeyResponse>
{
  constructor(public flowmachinegroupId: string) {
    super("RotateGroupKey");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.RotateGroupKey`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RotateGroupKeyResponse> {
    // No return value (204 No Content)
    return new RotateGroupKeyResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.flowmachinegroupId,
    };
  }
}

/**
 * RotateGroupKey response message
 */
export class RotateGroupKeyResponse extends OrganizationResponse {
  constructor() {
    super("RotateGroupKey");
  }

  static fromResponse(_data: unknown): RotateGroupKeyResponse {
    return new RotateGroupKeyResponse();
  }
}
