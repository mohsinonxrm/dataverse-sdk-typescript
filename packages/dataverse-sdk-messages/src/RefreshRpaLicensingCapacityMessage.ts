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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RefreshRpaLicensingCapacityResponse> {
    // The body is the complex value, with its @odata.context
    return RefreshRpaLicensingCapacityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RefreshRpaLicensingCapacity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RefreshRpaLicensingCapacityResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * RefreshRpaLicensingCapacity response message
 *
 * `result` is the value the RefreshRpaLicensingCapacity action returns (see {@link RefreshRpaLicensingCapacityResult}).
 */
export class RefreshRpaLicensingCapacityResponse extends OrganizationResponse {
  constructor(public result: RefreshRpaLicensingCapacityResult) {
    super("RefreshRpaLicensingCapacity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RefreshRpaLicensingCapacityResponse {
    return new RefreshRpaLicensingCapacityResponse(data as RefreshRpaLicensingCapacityResult);
  }
}
