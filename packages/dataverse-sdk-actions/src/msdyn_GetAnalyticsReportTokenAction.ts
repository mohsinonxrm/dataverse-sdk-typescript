import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAnalyticsReportToken action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAnalyticsReportTokenResponse {
  "@odata.context"?: string;
  Expiration: string;
  Token: string;
}

/**
 * Parameters of the msdyn_GetAnalyticsReportToken action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAnalyticsReportTokenActionParameters {
  AnalyticsRecordId: string;
}

/**
 * msdyn_GetAnalyticsReportToken action
 *
 * Unbound action
 */
export class msdyn_GetAnalyticsReportTokenAction implements Executable<msdyn_GetAnalyticsReportTokenResponse> {
  constructor(public readonly parameters: msdyn_GetAnalyticsReportTokenActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnalyticsReportToken`;

    const body = requestBody({
      AnalyticsRecordId: this.parameters.AnalyticsRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnalyticsReportTokenResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAnalyticsReportTokenResponse;
  }
}
