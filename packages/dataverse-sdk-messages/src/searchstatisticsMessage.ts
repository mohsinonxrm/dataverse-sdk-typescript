import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * searchstatistics request message
 *
 * Web API Function: searchstatistics
 */
export class searchstatisticsRequest
  extends OrganizationRequest
  implements Executable<searchstatisticsResponse>
{
  constructor() {
    super("searchstatistics");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/searchstatistics`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<searchstatisticsResponse> {
    // The body is the complex value, with its @odata.context
    return searchstatisticsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the searchstatistics function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchstatisticsResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * searchstatistics response message
 *
 * `result` is the value the searchstatistics function returns (see {@link searchstatisticsResult}).
 */
export class searchstatisticsResponse extends OrganizationResponse {
  constructor(public result: searchstatisticsResult) {
    super("searchstatistics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): searchstatisticsResponse {
    return new searchstatisticsResponse(data as searchstatisticsResult);
  }
}
