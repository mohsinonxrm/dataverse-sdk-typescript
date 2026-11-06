import { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';
import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { responseValue } from './internal/responseData.js';
import { requestBody } from './internal/requestBody.js';

/**
 * Parameters of the SendGreeting message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendGreetingRequestParameters {
  Message: string;
}

/**
 * SendGreeting request message
 *
 * Web API Action: SendGreeting
 */
export class SendGreetingRequest extends OrganizationRequest implements Executable<SendGreetingResponse> {
  declare readonly Parameters: Readonly<SendGreetingRequestParameters>;

  constructor(
    parameters: SendGreetingRequestParameters,
  ) {
    super('SendGreeting', { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendGreeting`;

    const body = requestBody({
      Message: this.Parameters.Message,
    });

    return {
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SendGreetingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? '' : await response.text();
    return SendGreetingResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * SendGreeting response message
 */
export class SendGreetingResponse extends OrganizationResponse {
  constructor(
    public result: string
  ) {
    super('SendGreeting');
  }

  static fromResponse(data: unknown): SendGreetingResponse {
    return new SendGreetingResponse(responseValue<string>(data));
  }
}
