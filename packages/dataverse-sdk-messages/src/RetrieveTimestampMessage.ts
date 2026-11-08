import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveTimestamp request message
 *
 * Web API Function: RetrieveTimestamp
 */
export class RetrieveTimestampRequest
  extends OrganizationRequest
  implements Executable<RetrieveTimestampResponse>
{
  constructor() {
    super("RetrieveTimestamp");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveTimestamp`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveTimestampResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveTimestampResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveTimestamp function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTimestampResult {
  "@odata.context"?: string;
  Timestamp: string;
}

/**
 * RetrieveTimestamp response message
 *
 * `result` is the value the RetrieveTimestamp function returns (see {@link RetrieveTimestampResult}).
 */
export class RetrieveTimestampResponse extends OrganizationResponse {
  constructor(public result: RetrieveTimestampResult) {
    super("RetrieveTimestamp");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveTimestampResponse {
    return new RetrieveTimestampResponse(data as RetrieveTimestampResult);
  }
}
