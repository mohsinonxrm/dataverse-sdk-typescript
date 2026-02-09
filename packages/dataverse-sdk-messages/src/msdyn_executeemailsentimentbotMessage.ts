import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_executeemailsentimentbot request message
 *
 * Web API Action: msdyn_executeemailsentimentbot
 */
export class msdyn_executeemailsentimentbotRequest
  extends OrganizationRequest
  implements Executable<msdyn_executeemailsentimentbotResponse>
{
  constructor(
    public environmentId: string,
    public emailId: string
  ) {
    super("msdyn_executeemailsentimentbot");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeemailsentimentbot`;

    const body: Record<string, unknown> = {
      environmentId: this.environmentId,
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_executeemailsentimentbotResponse> {
    const data = await response.json();
    return msdyn_executeemailsentimentbotResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      environmentId: this.environmentId,
      emailId: this.emailId,
    };
  }
}

/**
 * msdyn_executeemailsentimentbot response message
 */
export class msdyn_executeemailsentimentbotResponse extends OrganizationResponse {
  constructor(public result: msdyn_executeemailsentimentbotResponse) {
    super("msdyn_executeemailsentimentbot");
  }

  static fromResponse(data: unknown): msdyn_executeemailsentimentbotResponse {
    return new msdyn_executeemailsentimentbotResponse((data as any).value);
  }
}
