import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _Downloademailasattachment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _DownloademailasattachmentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _DownloademailasattachmentResponse;
  }
}
