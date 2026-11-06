import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { pm_RefreshProcessMiningLicensingCapacityResponse as pm_RefreshProcessMiningLicensingCapacityResponseData } from "./types/index.js";

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
    const data = await response.json();
    return pm_RefreshProcessMiningLicensingCapacityResponse.fromResponse(data);
  }
}

/**
 * pm_RefreshProcessMiningLicensingCapacity response message
 */
export class pm_RefreshProcessMiningLicensingCapacityResponse extends OrganizationResponse {
  constructor(public result: pm_RefreshProcessMiningLicensingCapacityResponseData) {
    super("pm_RefreshProcessMiningLicensingCapacity");
  }

  static fromResponse(data: unknown): pm_RefreshProcessMiningLicensingCapacityResponse {
    return new pm_RefreshProcessMiningLicensingCapacityResponse(
      responseObject<pm_RefreshProcessMiningLicensingCapacityResponseData>(data)
    );
  }
}
