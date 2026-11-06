import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _Downloademailasattachment action
 */
export interface _DownloademailasattachmentResponse {
  emailRecordData: string;
}

/**
 * _Downloademailasattachment action
 *
 * Unbound action
 */
export class _DownloademailasattachmentAction implements Executable<_DownloademailasattachmentResponse> {
  constructor(
    public readonly emailIdToBeDownloaded: string,
    public readonly additionalParameter?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_Downloademailasattachment`;

    const body: Record<string, unknown> = {
      emailIdToBeDownloaded: this.emailIdToBeDownloaded,
      additionalParameter: this.additionalParameter,
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

  async parseResponse(response: Response): Promise<_DownloademailasattachmentResponse> {
    const data = await response.json();
    return data as _DownloademailasattachmentResponse;
  }
}
