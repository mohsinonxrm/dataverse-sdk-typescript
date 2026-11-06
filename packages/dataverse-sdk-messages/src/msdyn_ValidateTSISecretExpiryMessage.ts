import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ValidateTSISecretExpiryResponse as msdyn_ValidateTSISecretExpiryResponseData } from "./types/index.js";

/**
 * msdyn_ValidateTSISecretExpiry request message
 *
 * Web API Action: msdyn_ValidateTSISecretExpiry
 */
export class msdyn_ValidateTSISecretExpiryRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateTSISecretExpiryResponse>
{
  constructor() {
    super("msdyn_ValidateTSISecretExpiry");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateTSISecretExpiry`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateTSISecretExpiryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ValidateTSISecretExpiryResponse.fromResponse({});
    return msdyn_ValidateTSISecretExpiryResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ValidateTSISecretExpiry response message
 */
export class msdyn_ValidateTSISecretExpiryResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateTSISecretExpiryResponseData) {
    super("msdyn_ValidateTSISecretExpiry");
  }

  static fromResponse(data: unknown): msdyn_ValidateTSISecretExpiryResponse {
    return new msdyn_ValidateTSISecretExpiryResponse(
      responseObject<msdyn_ValidateTSISecretExpiryResponseData>(data)
    );
  }
}
