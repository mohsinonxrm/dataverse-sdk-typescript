import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

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
    const url = `${baseUrl}/flowmachinegroups(${odataLiteral.guid(this.flowmachinegroupId)})/Microsoft.Dynamics.CRM.RotateGroupKey`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<RotateGroupKeyResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RotateGroupKeyResponse());
  }
}

/**
 * RotateGroupKey response message
 */
export class RotateGroupKeyResponse extends OrganizationResponse {
  constructor() {
    super("RotateGroupKey");
  }

  static fromResponse(_data?: unknown): RotateGroupKeyResponse {
    return new RotateGroupKeyResponse();
  }
}
