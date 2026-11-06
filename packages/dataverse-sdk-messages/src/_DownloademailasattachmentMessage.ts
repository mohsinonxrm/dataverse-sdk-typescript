import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return _DownloademailasattachmentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _Downloademailasattachment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _DownloademailasattachmentResult {
  "@odata.context"?: string;
  emailRecordData: string;
}

/**
 * _Downloademailasattachment response message
 *
 * `result` is the value the _Downloademailasattachment action returns (see {@link _DownloademailasattachmentResult}).
 */
export class _DownloademailasattachmentResponse extends OrganizationResponse {
  constructor(public result: _DownloademailasattachmentResult) {
    super("_Downloademailasattachment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _DownloademailasattachmentResponse {
    return new _DownloademailasattachmentResponse(data as _DownloademailasattachmentResult);
  }
}
