import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AnalyzeServiceHealth request message
 *
 * Web API Action: msdyn_AnalyzeServiceHealth
 */
export class msdyn_AnalyzeServiceHealthRequest
  extends OrganizationRequest
  implements Executable<msdyn_AnalyzeServiceHealthResponse>
{
  constructor() {
    super("msdyn_AnalyzeServiceHealth");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AnalyzeServiceHealth`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AnalyzeServiceHealthResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AnalyzeServiceHealthResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AnalyzeServiceHealth action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AnalyzeServiceHealthResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_AnalyzeServiceHealth response message
 *
 * `result` is the value the msdyn_AnalyzeServiceHealth action returns (see {@link msdyn_AnalyzeServiceHealthResult}).
 */
export class msdyn_AnalyzeServiceHealthResponse extends OrganizationResponse {
  constructor(public result: msdyn_AnalyzeServiceHealthResult) {
    super("msdyn_AnalyzeServiceHealth");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AnalyzeServiceHealthResponse {
    return new msdyn_AnalyzeServiceHealthResponse(data as msdyn_AnalyzeServiceHealthResult);
  }
}
