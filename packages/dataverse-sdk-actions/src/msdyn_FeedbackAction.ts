import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_Feedback action
 */
export interface msdyn_FeedbackResponse {
  // No content returned
}

/**
 * msdyn_Feedback action
 *
 * Unbound action
 */
export class msdyn_FeedbackAction implements Executable<msdyn_FeedbackResponse> {
  constructor(
    public readonly featureName: string,
    public readonly value: number,
    public readonly description: string,
    public readonly properties: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Feedback`;

    const body: Record<string, unknown> = {
      FeatureName: this.featureName,
      Value: this.value,
      Description: this.description,
      Properties: this.properties,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FeedbackResponse> {
    // No return value (204 No Content)
    return {};
  }
}
