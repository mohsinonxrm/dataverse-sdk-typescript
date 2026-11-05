import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ValidateTSIKey request message
 *
 * Web API Action: msdyn_ValidateTSIKey
 */
export class msdyn_ValidateTSIKeyRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateTSIKeyResponse>
{
  constructor() {
    super("msdyn_ValidateTSIKey");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateTSIKey`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ValidateTSIKeyResponse> {
    const data = await response.json();
    return msdyn_ValidateTSIKeyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_ValidateTSIKey response message
 */
export class msdyn_ValidateTSIKeyResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateTSIKeyResponse) {
    super("msdyn_ValidateTSIKey");
  }

  static fromResponse(data: unknown): msdyn_ValidateTSIKeyResponse {
    return new msdyn_ValidateTSIKeyResponse((data as any).value);
  }
}
