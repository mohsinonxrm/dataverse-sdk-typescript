import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_sendFeedback message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_sendFeedbackRequestParameters {
  content: string;
}

/**
 * msdyn_sendFeedback request message
 *
 * Web API Action: msdyn_sendFeedback
 */
export class msdyn_sendFeedbackRequest
  extends OrganizationRequest
  implements Executable<msdyn_sendFeedbackResponse>
{
  declare readonly Parameters: Readonly<msdyn_sendFeedbackRequestParameters>;

  constructor(parameters: msdyn_sendFeedbackRequestParameters) {
    super("msdyn_sendFeedback", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_sendFeedback`;

    const body = requestBody({
      content: this.Parameters.content,
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

  parseResponse(_response: Response): Promise<msdyn_sendFeedbackResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_sendFeedbackResponse());
  }
}

/**
 * msdyn_sendFeedback response message
 */
export class msdyn_sendFeedbackResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_sendFeedback");
  }

  static fromResponse(_data?: unknown): msdyn_sendFeedbackResponse {
    return new msdyn_sendFeedbackResponse();
  }
}
