import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_BulkAITestCaseUploadResponse as msdyn_BulkAITestCaseUploadResponseData } from "./types/index.js";

/**
 * msdyn_BulkAITestCaseUpload request message
 *
 * Web API Action: msdyn_BulkAITestCaseUpload
 */
export class msdyn_BulkAITestCaseUploadRequest
  extends OrganizationRequest
  implements Executable<msdyn_BulkAITestCaseUploadResponse>
{
  constructor(public request: string) {
    super("msdyn_BulkAITestCaseUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestCaseUpload`;

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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestCaseUploadResponse> {
    const data = await response.json();
    return msdyn_BulkAITestCaseUploadResponse.fromResponse(data);
  }
}

/**
 * msdyn_BulkAITestCaseUpload response message
 */
export class msdyn_BulkAITestCaseUploadResponse extends OrganizationResponse {
  constructor(public result: msdyn_BulkAITestCaseUploadResponseData) {
    super("msdyn_BulkAITestCaseUpload");
  }

  static fromResponse(data: unknown): msdyn_BulkAITestCaseUploadResponse {
    return new msdyn_BulkAITestCaseUploadResponse(
      responseObject<msdyn_BulkAITestCaseUploadResponseData>(data)
    );
  }
}
