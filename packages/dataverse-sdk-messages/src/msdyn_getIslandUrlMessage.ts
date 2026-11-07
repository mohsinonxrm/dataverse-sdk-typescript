import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_getIslandUrl request message
 *
 * Web API Action: msdyn_getIslandUrl
 */
export class msdyn_getIslandUrlRequest
  extends OrganizationRequest
  implements Executable<msdyn_getIslandUrlResponse>
{
  constructor() {
    super("msdyn_getIslandUrl");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getIslandUrl`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getIslandUrlResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_getIslandUrlResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getIslandUrl action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getIslandUrlResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_getIslandUrl response message
 *
 * `result` is the value the msdyn_getIslandUrl action returns (see {@link msdyn_getIslandUrlResult}).
 */
export class msdyn_getIslandUrlResponse extends OrganizationResponse {
  constructor(public result: msdyn_getIslandUrlResult) {
    super("msdyn_getIslandUrl");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getIslandUrlResponse {
    return new msdyn_getIslandUrlResponse(data as msdyn_getIslandUrlResult);
  }
}
