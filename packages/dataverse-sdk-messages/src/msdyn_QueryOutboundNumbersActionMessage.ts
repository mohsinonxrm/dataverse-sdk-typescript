import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_QueryOutboundNumbersAction request message
 *
 * Web API Action: msdyn_QueryOutboundNumbersAction
 */
export class msdyn_QueryOutboundNumbersActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueryOutboundNumbersActionResponse>
{
  constructor() {
    super("msdyn_QueryOutboundNumbersAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueryOutboundNumbersAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_QueryOutboundNumbersActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_QueryOutboundNumbersActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_QueryOutboundNumbersAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_QueryOutboundNumbersActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_QueryOutboundNumbersAction response message
 *
 * `result` is the value the msdyn_QueryOutboundNumbersAction action returns (see {@link msdyn_QueryOutboundNumbersActionResult}).
 */
export class msdyn_QueryOutboundNumbersActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_QueryOutboundNumbersActionResult) {
    super("msdyn_QueryOutboundNumbersAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_QueryOutboundNumbersActionResponse {
    return new msdyn_QueryOutboundNumbersActionResponse(
      data as msdyn_QueryOutboundNumbersActionResult
    );
  }
}
