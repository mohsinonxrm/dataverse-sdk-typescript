import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PublishXml action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PublishXmlResponse = void;

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

  parseResponse(_response: Response): Promise<PublishXmlResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
