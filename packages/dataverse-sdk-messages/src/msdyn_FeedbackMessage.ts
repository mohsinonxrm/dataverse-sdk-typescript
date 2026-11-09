import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_Feedback message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FeedbackRequestParameters {
  FeatureName: string;
  Value?: number;
  Description?: string;
  Properties?: string;
}

/**
 * msdyn_Feedback request message
 *
 * Web API Action: msdyn_Feedback
 */
export class msdyn_FeedbackRequest
  extends OrganizationRequest
  implements Executable<msdyn_FeedbackResponse>
{
  declare readonly Parameters: Readonly<msdyn_FeedbackRequestParameters>;

  constructor(parameters: msdyn_FeedbackRequestParameters) {
    super("msdyn_Feedback", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Feedback`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
      Value: this.Parameters.Value,
      Description: this.Parameters.Description,
      Properties: this.Parameters.Properties,
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

  parseResponse(_response: Response): Promise<msdyn_FeedbackResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_FeedbackResponse());
  }
}

/**
 * msdyn_Feedback response message
 */
export class msdyn_FeedbackResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_Feedback");
  }

  static fromResponse(_data?: unknown): msdyn_FeedbackResponse {
    return new msdyn_FeedbackResponse();
  }
}
