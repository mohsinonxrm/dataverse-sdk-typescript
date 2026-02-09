import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_BulkAITestCaseUpload action
 */
export interface msdyn_BulkAITestCaseUploadResponse {
  response: string;
}

/**
 * msdyn_BulkAITestCaseUpload action
 *
 * Unbound action
 */
export class msdyn_BulkAITestCaseUploadAction implements Executable<msdyn_BulkAITestCaseUploadResponse> {
  constructor(public readonly request: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestCaseUpload`;

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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestCaseUploadResponse> {
    const data = await response.json();
    return data as msdyn_BulkAITestCaseUploadResponse;
  }
}
