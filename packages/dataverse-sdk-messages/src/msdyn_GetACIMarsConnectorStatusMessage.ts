import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetACIMarsConnectorStatus request message
 *
 * Web API Action: msdyn_GetACIMarsConnectorStatus
 */
export class msdyn_GetACIMarsConnectorStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetACIMarsConnectorStatusResponse>
{
  constructor() {
    super("msdyn_GetACIMarsConnectorStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetACIMarsConnectorStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetACIMarsConnectorStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetACIMarsConnectorStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetACIMarsConnectorStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetACIMarsConnectorStatusResult {
  "@odata.context"?: string;
  MarsStatus: string;
}

/**
 * msdyn_GetACIMarsConnectorStatus response message
 *
 * `result` is the value the msdyn_GetACIMarsConnectorStatus action returns (see {@link msdyn_GetACIMarsConnectorStatusResult}).
 */
export class msdyn_GetACIMarsConnectorStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetACIMarsConnectorStatusResult) {
    super("msdyn_GetACIMarsConnectorStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetACIMarsConnectorStatusResponse {
    return new msdyn_GetACIMarsConnectorStatusResponse(
      data as msdyn_GetACIMarsConnectorStatusResult
    );
  }
}
