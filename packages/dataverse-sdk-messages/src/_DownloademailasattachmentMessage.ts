import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { _DownloademailasattachmentResponse as _DownloademailasattachmentResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<_DownloademailasattachmentResponse> {
    const data = await response.json();
    return _DownloademailasattachmentResponse.fromResponse(data);
  }
}

/**
 * _Downloademailasattachment response message
 */
export class _DownloademailasattachmentResponse extends OrganizationResponse {
  constructor(public result: _DownloademailasattachmentResponseData) {
    super("_Downloademailasattachment");
  }

  static fromResponse(data: unknown): _DownloademailasattachmentResponse {
    return new _DownloademailasattachmentResponse(
      responseObject<_DownloademailasattachmentResponseData>(data)
    );
  }
}
