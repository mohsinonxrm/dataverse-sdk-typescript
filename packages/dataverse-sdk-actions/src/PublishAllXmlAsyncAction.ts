import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PublishAllXmlAsync action
 */
export interface PublishAllXmlAsyncResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PublishAllXmlAsyncResponse;
    return (await response.json()) as PublishAllXmlAsyncResponse;
  }
}
