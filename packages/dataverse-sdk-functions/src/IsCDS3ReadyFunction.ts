import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the IsCDS3Ready function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsCDS3ReadyResponse {
  "@odata.context"?: string;
  IsReady: boolean;
}

/**
 * IsCDS3Ready function
 *
 * Unbound function
 */
export class IsCDS3ReadyFunction implements Executable<IsCDS3ReadyResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsCDS3Ready`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsCDS3ReadyResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as IsCDS3ReadyResponse;
  }
}
