import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_BulkAITestRun request message
 *
 * Web API Action: msdyn_BulkAITestRun
 */
export class msdyn_BulkAITestRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_BulkAITestRunResponse>
{
  constructor(public request: string) {
    super("msdyn_BulkAITestRun");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestRun`;

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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestRunResponse> {
    const data = await response.json();
    return msdyn_BulkAITestRunResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      request: this.request,
    };
  }
}

/**
 * msdyn_BulkAITestRun response message
 */
export class msdyn_BulkAITestRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_BulkAITestRunResponse) {
    super("msdyn_BulkAITestRun");
  }

  static fromResponse(data: unknown): msdyn_BulkAITestRunResponse {
    return new msdyn_BulkAITestRunResponse((data as any).value);
  }
}
