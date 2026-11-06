import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_getqaaperformancemetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getqaaperformancemetricsRequestParameters {
  Window?: string;
}

/**
 * msdyn_getqaaperformancemetrics request message
 *
 * Web API Action: msdyn_getqaaperformancemetrics
 */
export class msdyn_getqaaperformancemetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_getqaaperformancemetricsResponse>
{
  declare readonly Parameters: Readonly<msdyn_getqaaperformancemetricsRequestParameters>;

  constructor(parameters: msdyn_getqaaperformancemetricsRequestParameters = {}) {
    super("msdyn_getqaaperformancemetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getqaaperformancemetrics`;

    const body = requestBody({
      Window: this.Parameters.Window,
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

  async parseResponse(response: Response): Promise<msdyn_getqaaperformancemetricsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_getqaaperformancemetricsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getqaaperformancemetrics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getqaaperformancemetricsResult {
  "@odata.context"?: string;
  AsOf: string;
  CoachingNudges: number;
  Coverage: string;
  DailySeries: string;
  DippedEvaluations: number;
  Error: string;
  EvaluationCount: number;
  QualityInsights: string;
  QualityScore: number;
  Status: string;
  SupervisorNotifications: number;
  Window: string;
  WindowEndDate: string;
  WindowStartDate: string;
}

/**
 * msdyn_getqaaperformancemetrics response message
 *
 * `result` is the value the msdyn_getqaaperformancemetrics action returns (see {@link msdyn_getqaaperformancemetricsResult}).
 */
export class msdyn_getqaaperformancemetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_getqaaperformancemetricsResult) {
    super("msdyn_getqaaperformancemetrics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getqaaperformancemetricsResponse {
    return new msdyn_getqaaperformancemetricsResponse(data as msdyn_getqaaperformancemetricsResult);
  }
}
