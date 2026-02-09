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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPmEnabledResponse> {
    const data = await response.json();
    return data as IsPmEnabledResponse;
  }
}
