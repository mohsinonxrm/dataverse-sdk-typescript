import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PublishXml action
 */
export interface PublishXmlResponse {
  // No content returned
}

/**
 * Parameters of the PublishXml action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PublishXmlActionParameters {
  ParameterXml: string;
}

/**
 * PublishXml action
 *
 * Unbound action
 */
export class PublishXmlAction implements Executable<PublishXmlResponse> {
  constructor(public readonly parameters: PublishXmlActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishXml`;

    const body = requestBody({
      ParameterXml: this.parameters.ParameterXml,
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

  async parseResponse(response: Response): Promise<PublishXmlResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PublishXmlResponse;
  }
}
