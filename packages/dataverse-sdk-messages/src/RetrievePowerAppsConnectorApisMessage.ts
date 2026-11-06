import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrievePowerAppsConnectorApis request message
 *
 * Web API Action: RetrievePowerAppsConnectorApis
 */
export class RetrievePowerAppsConnectorApisRequest
  extends OrganizationRequest
  implements Executable<RetrievePowerAppsConnectorApisResponse>
{
  constructor() {
    super("RetrievePowerAppsConnectorApis");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrievePowerAppsConnectorApis`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectorApisResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrievePowerAppsConnectorApisResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrievePowerAppsConnectorApisResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePowerAppsConnectorApis action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrievePowerAppsConnectorApisResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrievePowerAppsConnectorApis response message
 *
 * `result` is the value the RetrievePowerAppsConnectorApis action returns (see {@link RetrievePowerAppsConnectorApisResult}).
 */
export class RetrievePowerAppsConnectorApisResponse extends OrganizationResponse {
  constructor(public result: RetrievePowerAppsConnectorApisResult) {
    super("RetrievePowerAppsConnectorApis");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePowerAppsConnectorApisResponse {
    return new RetrievePowerAppsConnectorApisResponse(
      data === undefined ? [] : (data as { value: RetrievePowerAppsConnectorApisResult }).value
    );
  }
}
