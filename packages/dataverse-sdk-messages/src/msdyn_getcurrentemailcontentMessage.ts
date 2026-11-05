import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_getcurrentemailcontent request message
 *
 * Web API Action: msdyn_getcurrentemailcontent
 */
export class msdyn_getcurrentemailcontentRequest
  extends OrganizationRequest
  implements Executable<msdyn_getcurrentemailcontentResponse>
{
  constructor(public emailId: string) {
    super("msdyn_getcurrentemailcontent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getcurrentemailcontent`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_getcurrentemailcontentResponse> {
    const data = await response.json();
    return msdyn_getcurrentemailcontentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      emailId: this.emailId,
    };
  }
}

/**
 * msdyn_getcurrentemailcontent response message
 */
export class msdyn_getcurrentemailcontentResponse extends OrganizationResponse {
  constructor(public result: msdyn_getcurrentemailcontentResponse) {
    super("msdyn_getcurrentemailcontent");
  }

  static fromResponse(data: unknown): msdyn_getcurrentemailcontentResponse {
    return new msdyn_getcurrentemailcontentResponse((data as any).value);
  }
}
