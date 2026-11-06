import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { requestBody } from './internal/requestBody.js';

/**
 * Response from SendGreeting action
 */
export interface SendGreetingResponse {
  value: string;
}

/**
 * Parameters of the SendGreeting action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendGreetingActionParameters {
  Message: string;
}

/**
 * SendGreeting action
 *
 * Unbound action
 */
export class SendGreetingAction implements Executable<SendGreetingResponse> {
  constructor(
    public readonly parameters: SendGreetingActionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendGreeting`;

    const body = requestBody({
      Message: this.parameters.Message,
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
    return (text ? JSON.parse(text) : {}) as SendGreetingResponse;
  }
}
