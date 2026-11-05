import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_ValidateTSISecretExpiryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_ValidateTSISecretExpiry response message
 */
export class msdyn_ValidateTSISecretExpiryResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateTSISecretExpiryResponse) {
    super("msdyn_ValidateTSISecretExpiry");
  }

  static fromResponse(data: unknown): msdyn_ValidateTSISecretExpiryResponse {
    return new msdyn_ValidateTSISecretExpiryResponse((data as any).value);
  }
}
