import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IngestAnalyticsData action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_IngestAnalyticsDataResponse = void;

/**
 * Parameters of the msdyn_IngestAnalyticsData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IngestAnalyticsDataActionParameters {
  IngestionRequest: string;
}

/**
 * msdyn_IngestAnalyticsData action
 *
 * Unbound action
 */
export class msdyn_IngestAnalyticsDataAction implements Executable<msdyn_IngestAnalyticsDataResponse> {
  constructor(public readonly parameters: msdyn_IngestAnalyticsDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsData`;

    const body = requestBody({
      IngestionRequest: this.parameters.IngestionRequest,
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

  parseResponse(_response: Response): Promise<msdyn_IngestAnalyticsDataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
