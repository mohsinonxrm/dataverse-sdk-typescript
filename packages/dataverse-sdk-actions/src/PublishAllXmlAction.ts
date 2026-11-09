import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PublishAllXml action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PublishAllXmlResponse = void;

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

  parseResponse(_response: Response): Promise<PublishAllXmlResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
