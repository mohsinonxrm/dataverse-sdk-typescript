import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DeprovisionUnifiedRouting request message
 *
 * Web API Action: msdyn_DeprovisionUnifiedRouting
 */
export class msdyn_DeprovisionUnifiedRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeprovisionUnifiedRoutingResponse>
{
  constructor() {
    super("msdyn_DeprovisionUnifiedRouting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprovisionUnifiedRouting`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DeprovisionUnifiedRoutingResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_DeprovisionUnifiedRoutingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DeprovisionUnifiedRouting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DeprovisionUnifiedRoutingResult {
  "@odata.context"?: string;
  msdyn_customMessage: string;
  msdyn_errorCode: string;
  msdyn_responseCode: string;
  msdyn_serviceRequestId: string;
}

/**
 * msdyn_DeprovisionUnifiedRouting response message
 *
 * `result` is the value the msdyn_DeprovisionUnifiedRouting action returns (see {@link msdyn_DeprovisionUnifiedRoutingResult}).
 */
export class msdyn_DeprovisionUnifiedRoutingResponse extends OrganizationResponse {
  constructor(public result: msdyn_DeprovisionUnifiedRoutingResult) {
    super("msdyn_DeprovisionUnifiedRouting");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DeprovisionUnifiedRoutingResponse {
    return new msdyn_DeprovisionUnifiedRoutingResponse(
      data as msdyn_DeprovisionUnifiedRoutingResult
    );
  }
}
