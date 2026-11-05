import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_ForecastRecalculate request message
 *
 * Web API Action: msdyn_ForecastRecalculate
 */
export class msdyn_ForecastRecalculateRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastRecalculateResponse>
{
  constructor(
    public forecastInstance: EntityReference,
    public isRefreshHierarchy: boolean
  ) {
    super("msdyn_ForecastRecalculate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculate`;

    const body: Record<string, unknown> = {
      ForecastInstance: this.forecastInstance,
      IsRefreshHierarchy: this.isRefreshHierarchy,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateResponse> {
    // No return value (204 No Content)
    return new msdyn_ForecastRecalculateResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ForecastInstance: this.forecastInstance,
      IsRefreshHierarchy: this.isRefreshHierarchy,
    };
  }
}

/**
 * msdyn_ForecastRecalculate response message
 */
export class msdyn_ForecastRecalculateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ForecastRecalculate");
  }

  static fromResponse(_data: unknown): msdyn_ForecastRecalculateResponse {
    return new msdyn_ForecastRecalculateResponse();
  }
}
