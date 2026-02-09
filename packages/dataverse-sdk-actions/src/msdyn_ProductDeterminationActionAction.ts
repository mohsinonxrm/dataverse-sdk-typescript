import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProductDeterminationAction action
 */
export interface msdyn_ProductDeterminationActionResponse {
  Result: string;
}

/**
 * msdyn_ProductDeterminationAction action
 *
 * Unbound action
 */
export class msdyn_ProductDeterminationActionAction implements Executable<msdyn_ProductDeterminationActionResponse> {
  constructor(
    public readonly requestPayload: string,
    public readonly searchIteration: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationAction`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
      SearchIteration: this.searchIteration,
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

  async parseResponse(response: Response): Promise<msdyn_ProductDeterminationActionResponse> {
    const data = await response.json();
    return data as msdyn_ProductDeterminationActionResponse;
  }
}
