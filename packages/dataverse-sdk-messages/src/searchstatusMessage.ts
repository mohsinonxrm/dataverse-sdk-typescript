import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * searchstatus request message
 *
 * Web API Function: searchstatus
 */
export class searchstatusRequest
  extends OrganizationRequest
  implements Executable<searchstatusResponse>
{
  constructor() {
    super("searchstatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/searchstatus`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<searchstatusResponse> {
    // The body is the complex value, with its @odata.context
    return searchstatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the searchstatus function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface searchstatusResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * searchstatus response message
 *
 * `result` is the value the searchstatus function returns (see {@link searchstatusResult}).
 */
export class searchstatusResponse extends OrganizationResponse {
  constructor(public result: searchstatusResult) {
    super("searchstatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): searchstatusResponse {
    return new searchstatusResponse(data as searchstatusResult);
  }
}
