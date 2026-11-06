import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ImportAnalyticsReport action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ImportAnalyticsReportResponse = void;

/**
 * Parameters of the msdyn_ImportAnalyticsReport action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ImportAnalyticsReportActionParameters {
  msdyn_AnalyticsFeatureId: string;
  msdyn_OverwriteDraft?: boolean;
  msdyn_AnalyticsReportContent: string;
}

/**
 * msdyn_ImportAnalyticsReport action
 *
 * Unbound action
 */
export class msdyn_ImportAnalyticsReportAction implements Executable<msdyn_ImportAnalyticsReportResponse> {
  constructor(public readonly parameters: msdyn_ImportAnalyticsReportActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ImportAnalyticsReport`;

    const body = requestBody({
      msdyn_AnalyticsFeatureId: this.parameters.msdyn_AnalyticsFeatureId,
      msdyn_OverwriteDraft: this.parameters.msdyn_OverwriteDraft,
      msdyn_AnalyticsReportContent: this.parameters.msdyn_AnalyticsReportContent,
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

  parseResponse(_response: Response): Promise<msdyn_ImportAnalyticsReportResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
