import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ValidateTSIKeyResponse as msdyn_ValidateTSIKeyResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ValidateTSIKeyResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ValidateTSIKey response message
 */
export class msdyn_ValidateTSIKeyResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateTSIKeyResponseData) {
    super("msdyn_ValidateTSIKey");
  }

  static fromResponse(data: unknown): msdyn_ValidateTSIKeyResponse {
    return new msdyn_ValidateTSIKeyResponse(responseObject<msdyn_ValidateTSIKeyResponseData>(data));
  }
}
