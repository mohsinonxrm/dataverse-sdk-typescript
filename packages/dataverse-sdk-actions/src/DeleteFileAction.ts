import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteFile action
 */
export interface DeleteFileResponse {
  // No content returned
}

/**
 * DeleteFile action
 *
 * Unbound action
 */
export class DeleteFileAction implements Executable<DeleteFileResponse> {
  constructor(public readonly fileId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteFile`;

    const body: Record<string, unknown> = {
      FileId: this.fileId,
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

  async parseResponse(response: Response): Promise<DeleteFileResponse> {
    // No return value (204 No Content)
    return {};
  }
}
