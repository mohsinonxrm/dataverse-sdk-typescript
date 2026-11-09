import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PublishAllXmlAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PublishAllXmlAsyncResponse {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * PublishAllXmlAsync action
 *
 * Unbound action
 */
export class PublishAllXmlAsyncAction implements Executable<PublishAllXmlAsyncResponse> {
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
    return (await response.json()) as PublishAllXmlAsyncResponse;
  }
}
