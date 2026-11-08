import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveVersion request message
 *
 * Web API Function: RetrieveVersion
 */
export class RetrieveVersionRequest
  extends OrganizationRequest
  implements Executable<RetrieveVersionResponse>
{
  constructor() {
    super("RetrieveVersion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveVersion`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveVersionResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveVersionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveVersion function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveVersionResult {
  "@odata.context"?: string;
  Version: string;
}

/**
 * RetrieveVersion response message
 *
 * `result` is the value the RetrieveVersion function returns (see {@link RetrieveVersionResult}).
 */
export class RetrieveVersionResponse extends OrganizationResponse {
  constructor(public result: RetrieveVersionResult) {
    super("RetrieveVersion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveVersionResponse {
    return new RetrieveVersionResponse(data as RetrieveVersionResult);
  }
}
