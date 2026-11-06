import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateAITestCaseResponse as msdyn_CreateAITestCaseResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateAITestCaseResponse> {
    const data = await response.json();
    return msdyn_CreateAITestCaseResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateAITestCase response message
 */
export class msdyn_CreateAITestCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAITestCaseResponseData) {
    super("msdyn_CreateAITestCase");
  }

  static fromResponse(data: unknown): msdyn_CreateAITestCaseResponse {
    return new msdyn_CreateAITestCaseResponse(
      responseObject<msdyn_CreateAITestCaseResponseData>(data)
    );
  }
}
