import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * IsDataEncryptionActive request message
 *
 * Web API Function: IsDataEncryptionActive
 */
export class IsDataEncryptionActiveRequest
  extends OrganizationRequest
  implements Executable<IsDataEncryptionActiveResponse>
{
  constructor() {
    super("IsDataEncryptionActive");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsDataEncryptionActive`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsDataEncryptionActiveResponse> {
    // The body is the complex value, with its @odata.context
    return IsDataEncryptionActiveResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the IsDataEncryptionActive function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsDataEncryptionActiveResult {
  "@odata.context"?: string;
  IsActive: boolean;
}

/**
 * IsDataEncryptionActive response message
 *
 * `result` is the value the IsDataEncryptionActive function returns (see {@link IsDataEncryptionActiveResult}).
 */
export class IsDataEncryptionActiveResponse extends OrganizationResponse {
  constructor(public result: IsDataEncryptionActiveResult) {
    super("IsDataEncryptionActive");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IsDataEncryptionActiveResponse {
    return new IsDataEncryptionActiveResponse(data as IsDataEncryptionActiveResult);
  }
}
