import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ForecastRecalculateAll request message
 *
 * Web API Action: msdyn_ForecastRecalculateAll
 */
export class msdyn_ForecastRecalculateAllRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastRecalculateAllResponse>
{
  constructor() {
    super("msdyn_ForecastRecalculateAll");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculateAll`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateAllResponse> {
    // No return value (204 No Content)
    return new msdyn_ForecastRecalculateAllResponse();
  }
}

/**
 * msdyn_ForecastRecalculateAll response message
 */
export class msdyn_ForecastRecalculateAllResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ForecastRecalculateAll");
  }

  static fromResponse(_data: unknown): msdyn_ForecastRecalculateAllResponse {
    return new msdyn_ForecastRecalculateAllResponse();
  }
}
