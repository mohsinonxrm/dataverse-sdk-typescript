import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IsSharePointEnabled request message
 *
 * Web API Action: msdyn_IsSharePointEnabled
 */
export class msdyn_IsSharePointEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsSharePointEnabledResponse>
{
  constructor() {
    super("msdyn_IsSharePointEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSharePointEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSharePointEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IsSharePointEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IsSharePointEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsSharePointEnabledResult {
  "@odata.context"?: string;
  IsSharePointEnabled: boolean;
}

/**
 * msdyn_IsSharePointEnabled response message
 *
 * `result` is the value the msdyn_IsSharePointEnabled action returns (see {@link msdyn_IsSharePointEnabledResult}).
 */
export class msdyn_IsSharePointEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsSharePointEnabledResult) {
    super("msdyn_IsSharePointEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IsSharePointEnabledResponse {
    return new msdyn_IsSharePointEnabledResponse(data as msdyn_IsSharePointEnabledResult);
  }
}
