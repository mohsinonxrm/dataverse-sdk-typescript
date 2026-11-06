import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IsSSSEnabled request message
 *
 * Web API Action: msdyn_IsSSSEnabled
 */
export class msdyn_IsSSSEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsSSSEnabledResponse>
{
  constructor() {
    super("msdyn_IsSSSEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSSSEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSSSEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IsSSSEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IsSSSEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsSSSEnabledResult {
  "@odata.context"?: string;
  IsSSSEnabled: boolean;
}

/**
 * msdyn_IsSSSEnabled response message
 *
 * `result` is the value the msdyn_IsSSSEnabled action returns (see {@link msdyn_IsSSSEnabledResult}).
 */
export class msdyn_IsSSSEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsSSSEnabledResult) {
    super("msdyn_IsSSSEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IsSSSEnabledResponse {
    return new msdyn_IsSSSEnabledResponse(data as msdyn_IsSSSEnabledResult);
  }
}
