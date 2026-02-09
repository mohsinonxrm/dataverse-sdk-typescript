import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PublishXml action
 */
export interface PublishXmlResponse {
  // No content returned
}

/**
 * PublishXml action
 *
 * Unbound action
 */
export class PublishXmlAction implements Executable<PublishXmlResponse> {
  constructor(public readonly parameterXml: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishXml`;

    const body: Record<string, unknown> = {
      ParameterXml: this.parameterXml,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PublishXmlResponse> {
    // No return value (204 No Content)
    return {};
  }
}
