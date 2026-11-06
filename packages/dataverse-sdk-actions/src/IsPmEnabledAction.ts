import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the IsPmEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsPmEnabledResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as IsPmEnabledResponse;
  }
}
