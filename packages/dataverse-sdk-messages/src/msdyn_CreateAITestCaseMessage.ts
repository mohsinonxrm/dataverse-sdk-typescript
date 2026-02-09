import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreateAITestCase request message
 *
 * Web API Action: msdyn_CreateAITestCase
 */
export class msdyn_CreateAITestCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAITestCaseResponse>
{
  constructor(public request: string) {
    super("msdyn_CreateAITestCase");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAITestCase`;

    const body: Record<string, unknown> = {
      request: this.request,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAITestCaseResponse> {
    const data = await response.json();
    return msdyn_CreateAITestCaseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      request: this.request,
    };
  }
}

/**
 * msdyn_CreateAITestCase response message
 */
export class msdyn_CreateAITestCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAITestCaseResponse) {
    super("msdyn_CreateAITestCase");
  }

  static fromResponse(data: unknown): msdyn_CreateAITestCaseResponse {
    return new msdyn_CreateAITestCaseResponse((data as any).value);
  }
}
