import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_forecastdefinition } from "./types/index.js";

/**
 * Parameters of the msdyn_ForecastGenerateHierarchy message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastGenerateHierarchyRequestParameters {
  ForecastDefinition: EntityReference | EntityPayload<msdyn_forecastdefinition>;
  IsRefresh: boolean;
  RecurrenceIndex?: number;
}

/**
 * msdyn_ForecastGenerateHierarchy request message
 *
 * Web API Action: msdyn_ForecastGenerateHierarchy
 */
export class msdyn_ForecastGenerateHierarchyRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastGenerateHierarchyResponse>
{
  declare readonly Parameters: Readonly<msdyn_ForecastGenerateHierarchyRequestParameters>;

  constructor(parameters: msdyn_ForecastGenerateHierarchyRequestParameters) {
    super("msdyn_ForecastGenerateHierarchy", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastGenerateHierarchy`;

    const body = requestBody({
      ForecastDefinition: this.Parameters.ForecastDefinition,
      IsRefresh: this.Parameters.IsRefresh,
      RecurrenceIndex: this.Parameters.RecurrenceIndex,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ForecastGenerateHierarchyResponse.fromResponse(text ? JSON.parse(text) : {});
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
