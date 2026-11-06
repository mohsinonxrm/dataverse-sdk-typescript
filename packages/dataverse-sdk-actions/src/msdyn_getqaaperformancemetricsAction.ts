import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getqaaperformancemetrics action
 */
export interface msdyn_getqaaperformancemetricsResponse {
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
 * Parameters of the msdyn_getqaaperformancemetrics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getqaaperformancemetricsActionParameters {
  Window?: string;
}

/**
 * msdyn_getqaaperformancemetrics action
 *
 * Unbound action
 */
export class msdyn_getqaaperformancemetricsAction implements Executable<msdyn_getqaaperformancemetricsResponse> {
  constructor(public readonly parameters: msdyn_getqaaperformancemetricsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getqaaperformancemetrics`;

    const body = requestBody({
      Window: this.parameters.Window,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_getqaaperformancemetricsResponse;
    return (await response.json()) as msdyn_getqaaperformancemetricsResponse;
  }
}
