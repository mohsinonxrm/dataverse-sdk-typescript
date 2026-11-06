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
    // The body is the complex value, with its @odata.context
    return msdyn_ValidateTSIKeyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ValidateTSIKey action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateTSIKeyResult {
  "@odata.context"?: string;
  Message: string;
}

/**
 * msdyn_ValidateTSIKey response message
 *
 * `result` is the value the msdyn_ValidateTSIKey action returns (see {@link msdyn_ValidateTSIKeyResult}).
 */
export class msdyn_ValidateTSIKeyResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateTSIKeyResult) {
    super("msdyn_ValidateTSIKey");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ValidateTSIKeyResponse {
    return new msdyn_ValidateTSIKeyResponse(data as msdyn_ValidateTSIKeyResult);
  }
}
