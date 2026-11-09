import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveConnectorSettings request message
 *
 * Web API Action: RetrieveConnectorSettings
 */
export class RetrieveConnectorSettingsRequest
  extends OrganizationRequest
  implements Executable<RetrieveConnectorSettingsResponse>
{
  constructor() {
    super("RetrieveConnectorSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveConnectorSettingsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveConnectorSettingsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveConnectorSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveConnectorSettings action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveConnectorSettingsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveConnectorSettings response message
 *
 * `result` is the value the RetrieveConnectorSettings action returns (see {@link RetrieveConnectorSettingsResult}).
 */
export class RetrieveConnectorSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveConnectorSettingsResult) {
    super("RetrieveConnectorSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveConnectorSettingsResponse {
    return new RetrieveConnectorSettingsResponse(
      data === undefined ? [] : (data as { value: RetrieveConnectorSettingsResult }).value
    );
  }
}
