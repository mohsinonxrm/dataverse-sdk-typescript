import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_BulkAITestRunResponse as msdyn_BulkAITestRunResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_BulkAITestRunResponse> {
    const data = await response.json();
    return msdyn_BulkAITestRunResponse.fromResponse(data);
  }
}

/**
 * msdyn_BulkAITestRun response message
 */
export class msdyn_BulkAITestRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_BulkAITestRunResponseData) {
    super("msdyn_BulkAITestRun");
  }

  static fromResponse(data: unknown): msdyn_BulkAITestRunResponse {
    return new msdyn_BulkAITestRunResponse(responseObject<msdyn_BulkAITestRunResponseData>(data));
  }
}
