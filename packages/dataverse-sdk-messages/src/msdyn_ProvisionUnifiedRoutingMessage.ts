import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProvisionUnifiedRouting request message
 *
 * Web API Action: msdyn_ProvisionUnifiedRouting
 */
export class msdyn_ProvisionUnifiedRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionUnifiedRoutingResponse>
{
  constructor() {
    super("msdyn_ProvisionUnifiedRouting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionUnifiedRouting`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionUnifiedRoutingResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ProvisionUnifiedRoutingResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProvisionUnifiedRouting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProvisionUnifiedRoutingResult {
  "@odata.context"?: string;
  msdyn_customMessage: string;
  msdyn_errorCode: string;
  msdyn_responseCode: string;
  msdyn_serviceRequestId: string;
}

/**
 * msdyn_ProvisionUnifiedRouting response message
 *
 * `result` is the value the msdyn_ProvisionUnifiedRouting action returns (see {@link msdyn_ProvisionUnifiedRoutingResult}).
 */
export class msdyn_ProvisionUnifiedRoutingResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProvisionUnifiedRoutingResult) {
    super("msdyn_ProvisionUnifiedRouting");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProvisionUnifiedRoutingResponse {
    return new msdyn_ProvisionUnifiedRoutingResponse(data as msdyn_ProvisionUnifiedRoutingResult);
  }
}
