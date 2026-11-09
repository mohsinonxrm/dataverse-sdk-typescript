import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PublishAllXmlAsync request message
 *
 * Web API Action: PublishAllXmlAsync
 */
export class PublishAllXmlAsyncRequest
  extends OrganizationRequest
  implements Executable<PublishAllXmlAsyncResponse>
{
  constructor() {
    super("PublishAllXmlAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishAllXmlAsync`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishAllXmlAsyncResponse> {
    // The body is the complex value, with its @odata.context
    return PublishAllXmlAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PublishAllXmlAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PublishAllXmlAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * PublishAllXmlAsync response message
 *
 * `result` is the value the PublishAllXmlAsync action returns (see {@link PublishAllXmlAsyncResult}).
 */
export class PublishAllXmlAsyncResponse extends OrganizationResponse {
  constructor(public result: PublishAllXmlAsyncResult) {
    super("PublishAllXmlAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PublishAllXmlAsyncResponse {
    return new PublishAllXmlAsyncResponse(data as PublishAllXmlAsyncResult);
  }
}
