import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * pm_RefreshProcessMiningLicensingCapacity request message
 *
 * Web API Action: pm_RefreshProcessMiningLicensingCapacity
 */
export class pm_RefreshProcessMiningLicensingCapacityRequest
  extends OrganizationRequest
  implements Executable<pm_RefreshProcessMiningLicensingCapacityResponse>
{
  constructor() {
    super("pm_RefreshProcessMiningLicensingCapacity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pm_RefreshProcessMiningLicensingCapacity`;

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
  ): Promise<pm_RefreshProcessMiningLicensingCapacityResponse> {
    // The body is the complex value, with its @odata.context
    return pm_RefreshProcessMiningLicensingCapacityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the pm_RefreshProcessMiningLicensingCapacity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface pm_RefreshProcessMiningLicensingCapacityResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * pm_RefreshProcessMiningLicensingCapacity response message
 *
 * `result` is the value the pm_RefreshProcessMiningLicensingCapacity action returns (see {@link pm_RefreshProcessMiningLicensingCapacityResult}).
 */
export class pm_RefreshProcessMiningLicensingCapacityResponse extends OrganizationResponse {
  constructor(public result: pm_RefreshProcessMiningLicensingCapacityResult) {
    super("pm_RefreshProcessMiningLicensingCapacity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): pm_RefreshProcessMiningLicensingCapacityResponse {
    return new pm_RefreshProcessMiningLicensingCapacityResponse(
      data as pm_RefreshProcessMiningLicensingCapacityResult
    );
  }
}
