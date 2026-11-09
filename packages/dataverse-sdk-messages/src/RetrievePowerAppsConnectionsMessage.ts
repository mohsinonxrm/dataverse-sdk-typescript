import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrievePowerAppsConnections request message
 *
 * Web API Action: RetrievePowerAppsConnections
 */
export class RetrievePowerAppsConnectionsRequest
  extends OrganizationRequest
  implements Executable<RetrievePowerAppsConnectionsResponse>
{
  constructor() {
    super("RetrievePowerAppsConnections");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrievePowerAppsConnections`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectionsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrievePowerAppsConnectionsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrievePowerAppsConnectionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePowerAppsConnections action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrievePowerAppsConnectionsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrievePowerAppsConnections response message
 *
 * `result` is the value the RetrievePowerAppsConnections action returns (see {@link RetrievePowerAppsConnectionsResult}).
 */
export class RetrievePowerAppsConnectionsResponse extends OrganizationResponse {
  constructor(public result: RetrievePowerAppsConnectionsResult) {
    super("RetrievePowerAppsConnections");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePowerAppsConnectionsResponse {
    return new RetrievePowerAppsConnectionsResponse(
      data === undefined ? [] : (data as { value: RetrievePowerAppsConnectionsResult }).value
    );
  }
}
