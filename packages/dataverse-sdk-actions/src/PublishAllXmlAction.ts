import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PublishAllXml action
 */
export interface PublishAllXmlResponse {
  // No content returned
}

/**
 * PublishAllXml action
 *
 * Unbound action
 */
export class PublishAllXmlAction implements Executable<PublishAllXmlResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishAllXml`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishAllXmlResponse> {
    // No return value (204 No Content)
    return {};
  }
}
