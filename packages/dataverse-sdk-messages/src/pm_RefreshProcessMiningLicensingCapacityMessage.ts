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
    const data = await response.json();
    return pm_RefreshProcessMiningLicensingCapacityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * pm_RefreshProcessMiningLicensingCapacity response message
 */
export class pm_RefreshProcessMiningLicensingCapacityResponse extends OrganizationResponse {
  constructor(public result: pm_RefreshProcessMiningLicensingCapacityResponse) {
    super("pm_RefreshProcessMiningLicensingCapacity");
  }

  static fromResponse(data: unknown): pm_RefreshProcessMiningLicensingCapacityResponse {
    return new pm_RefreshProcessMiningLicensingCapacityResponse((data as any).value);
  }
}
