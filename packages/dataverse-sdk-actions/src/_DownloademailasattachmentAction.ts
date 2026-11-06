import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from _Downloademailasattachment action
 */
export interface _DownloademailasattachmentResponse {
  emailRecordData: string;
}

/**
 * Parameters of the _Downloademailasattachment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _DownloademailasattachmentActionParameters {
  emailIdToBeDownloaded: string;
  additionalParameter?: string;
}

/**
 * _Downloademailasattachment action
 *
 * Unbound action
 */
export class _DownloademailasattachmentAction implements Executable<_DownloademailasattachmentResponse> {
  constructor(public readonly parameters: _DownloademailasattachmentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_Downloademailasattachment`;

    const body = requestBody({
      emailIdToBeDownloaded: this.parameters.emailIdToBeDownloaded,
      additionalParameter: this.parameters.additionalParameter,
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

  async parseResponse(response: Response): Promise<_DownloademailasattachmentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as _DownloademailasattachmentResponse;
    return (await response.json()) as _DownloademailasattachmentResponse;
  }
}
