import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { _DownloademailasattachmentResponse as _DownloademailasattachmentResponseData } from "./types/index.js";

/**
 * Parameters of the _Downloademailasattachment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _DownloademailasattachmentRequestParameters {
  emailIdToBeDownloaded: string;
  additionalParameter?: string;
}

/**
 * _Downloademailasattachment request message
 *
 * Web API Action: _Downloademailasattachment
 */
export class _DownloademailasattachmentRequest
  extends OrganizationRequest
  implements Executable<_DownloademailasattachmentResponse>
{
  declare readonly Parameters: Readonly<_DownloademailasattachmentRequestParameters>;

  constructor(parameters: _DownloademailasattachmentRequestParameters) {
    super("_Downloademailasattachment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_Downloademailasattachment`;

    const body = requestBody({
      emailIdToBeDownloaded: this.Parameters.emailIdToBeDownloaded,
      additionalParameter: this.Parameters.additionalParameter,
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
    if (response.status === 204) return _DownloademailasattachmentResponse.fromResponse({});
    return _DownloademailasattachmentResponse.fromResponse(await response.json());
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
