import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RotateGroupKey request message
 *
 * Web API Action: RotateGroupKey
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RotateGroupKeyResponse> {
    // No return value (204 No Content)
    return new RotateGroupKeyResponse();
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
