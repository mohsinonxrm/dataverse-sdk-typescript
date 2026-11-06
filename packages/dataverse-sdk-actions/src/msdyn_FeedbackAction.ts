import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_Feedback action
 */
export interface msdyn_FeedbackResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_Feedback action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FeedbackActionParameters {
  FeatureName: string;
  Value?: number;
  Description?: string;
  Properties?: string;
}

/**
 * msdyn_Feedback action
 *
 * Unbound action
 */
export class msdyn_FeedbackAction implements Executable<msdyn_FeedbackResponse> {
  constructor(public readonly parameters: msdyn_FeedbackActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Feedback`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
      Value: this.parameters.Value,
      Description: this.parameters.Description,
      Properties: this.parameters.Properties,
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

  async parseResponse(response: Response): Promise<msdyn_FeedbackResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FeedbackResponse;
  }
}
