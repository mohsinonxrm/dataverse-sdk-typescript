import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetPublicKeyResponse as GetPublicKeyResponseData } from "./types/index.js";

/**
 * GetPublicKey request message
 *
 * Web API Action: GetPublicKey
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
    const data = await response.json();
    return GetPublicKeyResponse.fromResponse(data);
  }
}

/**
 * GetPublicKey response message
 */
export class GetPublicKeyResponse extends OrganizationResponse {
  constructor(public result: GetPublicKeyResponseData) {
    super("GetPublicKey");
  }

  static fromResponse(data: unknown): GetPublicKeyResponse {
    return new GetPublicKeyResponse(responseObject<GetPublicKeyResponseData>(data));
  }
}
