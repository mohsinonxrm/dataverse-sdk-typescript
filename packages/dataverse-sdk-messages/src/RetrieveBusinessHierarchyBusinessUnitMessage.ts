import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { businessunit } from "./types/index.js";

/**
 * RetrieveBusinessHierarchyBusinessUnit request message
 *
 * Web API Function: RetrieveBusinessHierarchyBusinessUnit
 *
 * The first argument is the id of the businessunit record to call it on.
 */
export class RetrieveBusinessHierarchyBusinessUnitRequest
  extends OrganizationRequest
  implements Executable<RetrieveBusinessHierarchyBusinessUnitResponse>
{
  constructor(public businessunitId: string) {
    super("RetrieveBusinessHierarchyBusinessUnit");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/businessunits(${odataLiteral.guid(this.businessunitId)})/Microsoft.Dynamics.CRM.RetrieveBusinessHierarchyBusinessUnit`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveBusinessHierarchyBusinessUnitResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveBusinessHierarchyBusinessUnitResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveBusinessHierarchyBusinessUnitResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveBusinessHierarchyBusinessUnit function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveBusinessHierarchyBusinessUnitResult = Array<
  businessunit & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveBusinessHierarchyBusinessUnit response message
 *
 * `result` is the value the RetrieveBusinessHierarchyBusinessUnit function returns (see {@link RetrieveBusinessHierarchyBusinessUnitResult}).
 */
export class RetrieveBusinessHierarchyBusinessUnitResponse extends OrganizationResponse {
  constructor(public result: RetrieveBusinessHierarchyBusinessUnitResult) {
    super("RetrieveBusinessHierarchyBusinessUnit");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveBusinessHierarchyBusinessUnitResponse {
    return new RetrieveBusinessHierarchyBusinessUnitResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveBusinessHierarchyBusinessUnitResult }).value
    );
  }
}
