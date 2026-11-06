import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RefreshRpaLicensingCapacityResponse as RefreshRpaLicensingCapacityResponseData } from "./types/index.js";

/**
 * RefreshRpaLicensingCapacity request message
 *
 * Web API Action: RefreshRpaLicensingCapacity
 */
export class RefreshRpaLicensingCapacityRequest
  extends OrganizationRequest
  implements Executable<RefreshRpaLicensingCapacityResponse>
{
  constructor() {
    super("RefreshRpaLicensingCapacity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RefreshRpaLicensingCapacity`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RefreshRpaLicensingCapacityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RefreshRpaLicensingCapacityResponse.fromResponse({});
    return RefreshRpaLicensingCapacityResponse.fromResponse(await response.json());
  }
}

/**
 * RefreshRpaLicensingCapacity response message
 */
export class RefreshRpaLicensingCapacityResponse extends OrganizationResponse {
  constructor(public result: RefreshRpaLicensingCapacityResponseData) {
    super("RefreshRpaLicensingCapacity");
  }

  static fromResponse(data: unknown): RefreshRpaLicensingCapacityResponse {
    return new RefreshRpaLicensingCapacityResponse(
      responseObject<RefreshRpaLicensingCapacityResponseData>(data)
    );
  }
}
