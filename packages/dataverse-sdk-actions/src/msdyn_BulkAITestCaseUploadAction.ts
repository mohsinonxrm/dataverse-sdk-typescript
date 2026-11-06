import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_BulkAITestCaseUpload action
 */
export interface msdyn_BulkAITestCaseUploadResponse {
  response: string;
}

/**
 * Parameters of the msdyn_BulkAITestCaseUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BulkAITestCaseUploadActionParameters {
  request: string;
}

/**
 * msdyn_BulkAITestCaseUpload action
 *
 * Unbound action
 */
export class msdyn_BulkAITestCaseUploadAction implements Executable<msdyn_BulkAITestCaseUploadResponse> {
  constructor(public readonly parameters: msdyn_BulkAITestCaseUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestCaseUpload`;

    const body = requestBody({
      request: this.parameters.request,
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
    if (response.status === 204) return {} as msdyn_BulkAITestCaseUploadResponse;
    return (await response.json()) as msdyn_BulkAITestCaseUploadResponse;
  }
}
