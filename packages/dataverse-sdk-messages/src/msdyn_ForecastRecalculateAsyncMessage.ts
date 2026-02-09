import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_ForecastRecalculateAsync request message
 *
 * Web API Action: msdyn_ForecastRecalculateAsync
 */
export class msdyn_ForecastRecalculateAsyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastRecalculateAsyncResponse>
{
  constructor(
    public forecastInstance: EntityReference,
    public isRefreshHierarchy: boolean
  ) {
    super("msdyn_ForecastRecalculateAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculateAsync`;

    const body: Record<string, unknown> = {
      ForecastInstance: this.forecastInstance,
      IsRefreshHierarchy: this.isRefreshHierarchy,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateAsyncResponse> {
    // No return value (204 No Content)
    return new msdyn_ForecastRecalculateAsyncResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ForecastInstance: this.forecastInstance,
      IsRefreshHierarchy: this.isRefreshHierarchy,
    };
  }
}

/**
 * msdyn_ForecastRecalculateAsync response message
 */
export class msdyn_ForecastRecalculateAsyncResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ForecastRecalculateAsync");
  }

  static fromResponse(_data: unknown): msdyn_ForecastRecalculateAsyncResponse {
    return new msdyn_ForecastRecalculateAsyncResponse();
  }
}
