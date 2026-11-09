import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetLegalAcceptanceStatus request message
 *
 * Web API Action: msdyn_GetLegalAcceptanceStatus
 */
export class msdyn_GetLegalAcceptanceStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLegalAcceptanceStatusResponse>
{
  constructor() {
    super("msdyn_GetLegalAcceptanceStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLegalAcceptanceStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLegalAcceptanceStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetLegalAcceptanceStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetLegalAcceptanceStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLegalAcceptanceStatusResult {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * msdyn_GetLegalAcceptanceStatus response message
 *
 * `result` is the value the msdyn_GetLegalAcceptanceStatus action returns (see {@link msdyn_GetLegalAcceptanceStatusResult}).
 */
export class msdyn_GetLegalAcceptanceStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLegalAcceptanceStatusResult) {
    super("msdyn_GetLegalAcceptanceStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetLegalAcceptanceStatusResponse {
    return new msdyn_GetLegalAcceptanceStatusResponse(data as msdyn_GetLegalAcceptanceStatusResult);
  }
}
