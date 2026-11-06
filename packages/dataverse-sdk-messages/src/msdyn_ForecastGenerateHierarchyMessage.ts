import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_ForecastGenerateHierarchyResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_ForecastGenerateHierarchyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ForecastGenerateHierarchy action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_ForecastGenerateHierarchyResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_ForecastGenerateHierarchy response message
 *
 * `result` is the value the msdyn_ForecastGenerateHierarchy action returns (see {@link msdyn_ForecastGenerateHierarchyResult}).
 */
export class msdyn_ForecastGenerateHierarchyResponse extends OrganizationResponse {
  constructor(public result: msdyn_ForecastGenerateHierarchyResult) {
    super("msdyn_ForecastGenerateHierarchy");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ForecastGenerateHierarchyResponse {
    return new msdyn_ForecastGenerateHierarchyResponse(
      data === undefined ? [] : (data as { value: msdyn_ForecastGenerateHierarchyResult }).value
    );
  }
}
