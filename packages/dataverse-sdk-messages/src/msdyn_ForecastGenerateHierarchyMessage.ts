import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { msdyn_forecastdefinition } from "./types/index.js";

/**
 * msdyn_ForecastGenerateHierarchy request message
 *
 * Web API Action: msdyn_ForecastGenerateHierarchy
 */
export class msdyn_ForecastGenerateHierarchyRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastGenerateHierarchyResponse>
{
  constructor(
    public forecastDefinition: msdyn_forecastdefinition,
    public isRefresh: boolean,
    public recurrenceIndex: number
  ) {
    super("msdyn_ForecastGenerateHierarchy");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastGenerateHierarchy`;

    const body: Record<string, unknown> = {
      ForecastDefinition: this.forecastDefinition,
      IsRefresh: this.isRefresh,
      RecurrenceIndex: this.recurrenceIndex,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastGenerateHierarchyResponse> {
    const data = await response.json();
    return msdyn_ForecastGenerateHierarchyResponse.fromResponse(data);
  }
}

/**
 * msdyn_ForecastGenerateHierarchy response message
 */
export class msdyn_ForecastGenerateHierarchyResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_ForecastGenerateHierarchy");
  }

  static fromResponse(data: unknown): msdyn_ForecastGenerateHierarchyResponse {
    return new msdyn_ForecastGenerateHierarchyResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
