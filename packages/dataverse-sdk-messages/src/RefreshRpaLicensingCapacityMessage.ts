import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RefreshRpaLicensingCapacityResponse> {
    const data = await response.json();
    return RefreshRpaLicensingCapacityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * RefreshRpaLicensingCapacity response message
 */
export class RefreshRpaLicensingCapacityResponse extends OrganizationResponse {
  constructor(public result: RefreshRpaLicensingCapacityResponse) {
    super("RefreshRpaLicensingCapacity");
  }

  static fromResponse(data: unknown): RefreshRpaLicensingCapacityResponse {
    return new RefreshRpaLicensingCapacityResponse((data as any).value);
  }
}
