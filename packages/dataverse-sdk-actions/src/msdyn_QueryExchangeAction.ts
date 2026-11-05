import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_QueryExchange action
 */
export interface msdyn_QueryExchangeResponse {
  ExchangeData: string;
}

/**
 * msdyn_QueryExchange action
 *
 * Unbound action
 */
export class msdyn_QueryExchangeAction implements Executable<msdyn_QueryExchangeResponse> {
  constructor(
    public readonly method: string,
    public readonly body: string,
    public readonly requesturl: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueryExchange`;

    const body: Record<string, unknown> = {
      method: this.method,
      body: this.body,
      requesturl: this.requesturl,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_QueryExchangeResponse> {
    const data = await response.json();
    return data as msdyn_QueryExchangeResponse;
  }
}
