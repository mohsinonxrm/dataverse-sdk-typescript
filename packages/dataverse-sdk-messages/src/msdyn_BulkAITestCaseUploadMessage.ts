import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_BulkAITestCaseUploadResponse as msdyn_BulkAITestCaseUploadResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_BulkAITestCaseUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BulkAITestCaseUploadRequestParameters {
  request: string;
}

/**
 * msdyn_BulkAITestCaseUpload request message
 *
 * Web API Action: msdyn_BulkAITestCaseUpload
 */
export class msdyn_BulkAITestCaseUploadRequest
  extends OrganizationRequest
  implements Executable<msdyn_BulkAITestCaseUploadResponse>
{
  declare readonly Parameters: Readonly<msdyn_BulkAITestCaseUploadRequestParameters>;

  constructor(parameters: msdyn_BulkAITestCaseUploadRequestParameters) {
    super("msdyn_BulkAITestCaseUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestCaseUpload`;

    const body = requestBody({
      request: this.Parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestCaseUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_BulkAITestCaseUploadResponse.fromResponse({});
    return msdyn_BulkAITestCaseUploadResponse.fromResponse(await response.json());
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
