import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_processsentimentresponse request message
 *
 * Web API Action: msdyn_processsentimentresponse
 */
export class msdyn_processsentimentresponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_processsentimentresponseResponse>
{
  constructor(
    public emailId: string,
    public copilotResponse: string[],
    public conversationId: string
  ) {
    super("msdyn_processsentimentresponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_processsentimentresponse`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
      copilotResponse: this.copilotResponse,
      conversationId: this.conversationId,
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

  async parseResponse(response: Response): Promise<msdyn_processsentimentresponseResponse> {
    const data = await response.json();
    return msdyn_processsentimentresponseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      emailId: this.emailId,
      copilotResponse: this.copilotResponse,
      conversationId: this.conversationId,
    };
  }
}

/**
 * msdyn_processsentimentresponse response message
 */
export class msdyn_processsentimentresponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_processsentimentresponseResponse) {
    super("msdyn_processsentimentresponse");
  }

  static fromResponse(data: unknown): msdyn_processsentimentresponseResponse {
    return new msdyn_processsentimentresponseResponse((data as any).value);
  }
}
