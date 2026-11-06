import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from IsCDS3Ready function
 */
export interface IsCDS3ReadyResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as IsCDS3ReadyResponse;
    return (await response.json()) as IsCDS3ReadyResponse;
  }
}
