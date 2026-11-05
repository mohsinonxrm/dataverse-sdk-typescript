import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_Feedback request message
 *
 * Web API Action: msdyn_Feedback
 */
export class msdyn_FeedbackRequest
  extends OrganizationRequest
  implements Executable<msdyn_FeedbackResponse>
{
  constructor(
    public featureName: string,
    public value: number,
    public description: string,
    public properties: string
  ) {
    super("msdyn_Feedback");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FeedbackResponse> {
    // No return value (204 No Content)
    return new msdyn_FeedbackResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FeatureName: this.featureName,
      Value: this.value,
      Description: this.description,
      Properties: this.properties,
    };
  }
}

/**
 * msdyn_Feedback response message
 */
export class msdyn_FeedbackResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_Feedback");
  }

  static fromResponse(_data: unknown): msdyn_FeedbackResponse {
    return new msdyn_FeedbackResponse();
  }
}
