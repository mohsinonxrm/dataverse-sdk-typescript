import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_BulkAITestCaseUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_BulkAITestCaseUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_BulkAITestCaseUploadResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_BulkAITestCaseUpload response message
 *
 * `result` is the value the msdyn_BulkAITestCaseUpload action returns (see {@link msdyn_BulkAITestCaseUploadResult}).
 */
export class msdyn_BulkAITestCaseUploadResponse extends OrganizationResponse {
  constructor(public result: msdyn_BulkAITestCaseUploadResult) {
    super("msdyn_BulkAITestCaseUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_BulkAITestCaseUploadResponse {
    return new msdyn_BulkAITestCaseUploadResponse(data as msdyn_BulkAITestCaseUploadResult);
  }
}
