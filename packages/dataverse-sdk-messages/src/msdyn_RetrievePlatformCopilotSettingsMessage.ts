import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RetrievePlatformCopilotSettings request message
 *
 * Web API Action: msdyn_RetrievePlatformCopilotSettings
 */
export class msdyn_RetrievePlatformCopilotSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrievePlatformCopilotSettingsResponse>
{
  constructor() {
    super("msdyn_RetrievePlatformCopilotSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrievePlatformCopilotSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrievePlatformCopilotSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrievePlatformCopilotSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrievePlatformCopilotSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrievePlatformCopilotSettingsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrievePlatformCopilotSettings response message
 *
 * `result` is the value the msdyn_RetrievePlatformCopilotSettings action returns (see {@link msdyn_RetrievePlatformCopilotSettingsResult}).
 */
export class msdyn_RetrievePlatformCopilotSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrievePlatformCopilotSettingsResult) {
    super("msdyn_RetrievePlatformCopilotSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrievePlatformCopilotSettingsResponse {
    return new msdyn_RetrievePlatformCopilotSettingsResponse(
      data as msdyn_RetrievePlatformCopilotSettingsResult
    );
  }
}
