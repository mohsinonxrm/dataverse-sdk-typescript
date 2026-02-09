import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _Downloademailasattachment request message
 *
 * Web API Action: _Downloademailasattachment
 */
export class _DownloademailasattachmentRequest
  extends OrganizationRequest
  implements Executable<_DownloademailasattachmentResponse>
{
  constructor(
    public emailIdToBeDownloaded: string,
    public additionalParameter: string
  ) {
    super("_Downloademailasattachment");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<_DownloademailasattachmentResponse> {
    const data = await response.json();
    return _DownloademailasattachmentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      emailIdToBeDownloaded: this.emailIdToBeDownloaded,
      additionalParameter: this.additionalParameter,
    };
  }
}

/**
 * _Downloademailasattachment response message
 */
export class _DownloademailasattachmentResponse extends OrganizationResponse {
  constructor(public result: _DownloademailasattachmentResponse) {
    super("_Downloademailasattachment");
  }

  static fromResponse(data: unknown): _DownloademailasattachmentResponse {
    return new _DownloademailasattachmentResponse((data as any).value);
  }
}
