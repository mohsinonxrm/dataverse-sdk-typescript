import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetEnabledChannels request message
 *
 * Web API Action: msdyn_GetEnabledChannels
 */
export class msdyn_GetEnabledChannelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEnabledChannelsResponse>
{
  constructor() {
    super("msdyn_GetEnabledChannels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEnabledChannels`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetEnabledChannelsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetEnabledChannelsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetEnabledChannels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetEnabledChannelsResult {
  "@odata.context"?: string;
  enabledChannels: string;
}

/**
 * msdyn_GetEnabledChannels response message
 *
 * `result` is the value the msdyn_GetEnabledChannels action returns (see {@link msdyn_GetEnabledChannelsResult}).
 */
export class msdyn_GetEnabledChannelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEnabledChannelsResult) {
    super("msdyn_GetEnabledChannels");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetEnabledChannelsResponse {
    return new msdyn_GetEnabledChannelsResponse(data as msdyn_GetEnabledChannelsResult);
  }
}
