import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from IsPmEnabled action
 */
export interface IsPmEnabledResponse {
  response: string;
}

/**
 * IsPmEnabled action
 *
 * Unbound action
 */
export class IsPmEnabledAction implements Executable<IsPmEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/IsPmEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPmEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as IsPmEnabledResponse;
  }
}
