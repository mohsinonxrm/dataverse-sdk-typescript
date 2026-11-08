import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * WhoAmI request message
 *
 * Web API Function: WhoAmI
 */
export class WhoAmIRequest extends OrganizationRequest implements Executable<WhoAmIResponse> {
  constructor() {
    super("WhoAmI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/WhoAmI`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<WhoAmIResponse> {
    // The body is the complex value, with its @odata.context
    return WhoAmIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the WhoAmI function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface WhoAmIResult {
  "@odata.context"?: string;
  BusinessUnitId: string;
  OrganizationId: string;
  UserId: string;
}

/**
 * WhoAmI response message
 *
 * `result` is the value the WhoAmI function returns (see {@link WhoAmIResult}).
 */
export class WhoAmIResponse extends OrganizationResponse {
  constructor(public result: WhoAmIResult) {
    super("WhoAmI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): WhoAmIResponse {
    return new WhoAmIResponse(data as WhoAmIResult);
  }
}
