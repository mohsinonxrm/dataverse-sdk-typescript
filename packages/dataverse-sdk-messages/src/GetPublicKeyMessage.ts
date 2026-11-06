import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetPublicKey request message
 *
 * Web API Action: GetPublicKey
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class GetPublicKeyRequest
  extends OrganizationRequest
  implements Executable<GetPublicKeyResponse>
{
  constructor(public flowmachinegroupId: string) {
    super("GetPublicKey");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.GetPublicKey`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetPublicKeyResponse> {
    // The body is the complex value, with its @odata.context
    return GetPublicKeyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetPublicKey action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetPublicKeyResult {
  "@odata.context"?: string;
  groupPublicKey: string;
  groupSecondaryPublicKey: string;
}

/**
 * GetPublicKey response message
 *
 * `result` is the value the GetPublicKey action returns (see {@link GetPublicKeyResult}).
 */
export class GetPublicKeyResponse extends OrganizationResponse {
  constructor(public result: GetPublicKeyResult) {
    super("GetPublicKey");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetPublicKeyResponse {
    return new GetPublicKeyResponse(data as GetPublicKeyResult);
  }
}
