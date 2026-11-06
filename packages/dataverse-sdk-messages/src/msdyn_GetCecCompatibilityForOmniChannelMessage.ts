import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetCecCompatibilityForOmniChannel request message
 *
 * Web API Action: msdyn_GetCecCompatibilityForOmniChannel
 */
export class msdyn_GetCecCompatibilityForOmniChannelRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCecCompatibilityForOmniChannelResponse>
{
  constructor() {
    super("msdyn_GetCecCompatibilityForOmniChannel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCecCompatibilityForOmniChannel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetCecCompatibilityForOmniChannelResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetCecCompatibilityForOmniChannelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCecCompatibilityForOmniChannel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCecCompatibilityForOmniChannelResult {
  "@odata.context"?: string;
  IsResolvedLegacyCommand: boolean;
}

/**
 * msdyn_GetCecCompatibilityForOmniChannel response message
 *
 * `result` is the value the msdyn_GetCecCompatibilityForOmniChannel action returns (see {@link msdyn_GetCecCompatibilityForOmniChannelResult}).
 */
export class msdyn_GetCecCompatibilityForOmniChannelResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCecCompatibilityForOmniChannelResult) {
    super("msdyn_GetCecCompatibilityForOmniChannel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCecCompatibilityForOmniChannelResponse {
    return new msdyn_GetCecCompatibilityForOmniChannelResponse(
      data as msdyn_GetCecCompatibilityForOmniChannelResult
    );
  }
}
