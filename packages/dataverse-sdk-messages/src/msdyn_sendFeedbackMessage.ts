import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_sendFeedback request message
 *
 * Web API Action: msdyn_sendFeedback
 */
export class msdyn_sendFeedbackRequest
  extends OrganizationRequest
  implements Executable<msdyn_sendFeedbackResponse>
{
  constructor(public content: string) {
    super("msdyn_sendFeedback");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_sendFeedback`;

    const body: Record<string, unknown> = {
      content: this.content,
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

  async parseResponse(response: Response): Promise<msdyn_sendFeedbackResponse> {
    // No return value (204 No Content)
    return new msdyn_sendFeedbackResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      content: this.content,
    };
  }
}

/**
 * msdyn_sendFeedback response message
 */
export class msdyn_sendFeedbackResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_sendFeedback");
  }

  static fromResponse(_data: unknown): msdyn_sendFeedbackResponse {
    return new msdyn_sendFeedbackResponse();
  }
}
